import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class HiveStorageService {
  static const String draftsBoxName = 'saved_drafts';
  static const String cartBoxName = 'cart_cache';

  static Box<dynamic>? _draftsBox;
  static Box<dynamic>? _cartBox;

  static Future<void> init() async {
    try {
      await Hive.initFlutter();
      _draftsBox = await Hive.openBox(draftsBoxName);
      _cartBox = await Hive.openBox(cartBoxName);
      debugPrint('[OK] Hive local storage initialized successfully');
    } catch (e) {
      debugPrint('[WARN] Hive initialization fallback: $e');
    }
  }

  // --- Drafts Persistence ---
  static Future<void> saveDraft({
    required String id,
    required String name,
    required String token,
    required double wristSizeCm,
    required String cordType,
    required int beadCount,
    required double totalPrice,
    required List<Map<String, dynamic>> beads,
  }) async {
    final draft = {
      'id': id,
      'name': name,
      'token': token,
      'wristSizeCm': wristSizeCm,
      'cordType': cordType,
      'beadCount': beadCount,
      'totalPrice': totalPrice,
      'beads': beads,
      'createdAt': DateTime.now().toIso8601String(),
      'syncedToCloud': false,
    };
    if (_draftsBox != null) {
      await _draftsBox!.put(id, jsonEncode(draft));
    }
    // Attempt silent background synchronization to Supabase
    await syncDraftsToSupabase();
  }

  static List<Map<String, dynamic>> getDrafts() {
    if (_draftsBox == null) return [];
    final list = <Map<String, dynamic>>[];
    for (var val in _draftsBox!.values) {
      try {
        if (val is String) {
          list.add(Map<String, dynamic>.from(jsonDecode(val)));
        } else if (val is Map) {
          list.add(Map<String, dynamic>.from(val));
        }
      } catch (_) {}
    }
    return list;
  }

  static Future<void> deleteDraft(String id) async {
    if (_draftsBox != null) {
      await _draftsBox!.delete(id);
    }
  }

  // --- Cart Persistence ---
  static Future<void> saveCartItem(Map<String, dynamic> item) async {
    if (_cartBox != null) {
      final key = item['id']?.toString() ?? 'cart_${DateTime.now().millisecondsSinceEpoch}';
      await _cartBox!.put(key, jsonEncode(item));
    }
  }

  static List<Map<String, dynamic>> getCartItems() {
    if (_cartBox == null) return [];
    final list = <Map<String, dynamic>>[];
    for (var val in _cartBox!.values) {
      try {
        if (val is String) {
          list.add(Map<String, dynamic>.from(jsonDecode(val)));
        } else if (val is Map) {
          list.add(Map<String, dynamic>.from(val));
        }
      } catch (_) {}
    }
    return list;
  }

  static Future<void> clearCart() async {
    if (_cartBox != null) {
      await _cartBox!.clear();
    }
  }

  // --- Automatic Cloud Re-Sync ---
  static Future<int> syncDraftsToSupabase() async {
    try {
      final client = Supabase.instance.client;
      final user = client.auth.currentUser;
      if (user == null || _draftsBox == null) return 0;

      int syncedCount = 0;
      for (var key in _draftsBox!.keys) {
        final raw = _draftsBox!.get(key);
        if (raw == null) continue;
        Map<String, dynamic> draft;
        if (raw is String) {
          draft = Map<String, dynamic>.from(jsonDecode(raw));
        } else {
          draft = Map<String, dynamic>.from(raw as Map);
        }

        if (draft['syncedToCloud'] != true) {
          await client.from('custom_designs').insert({
            'user_id': user.id,
            'title': draft['name'] ?? 'Bespoke Bracelet',
            'design_token': draft['token'] ?? '',
            'wrist_size_cm': draft['wristSizeCm'] ?? 16.5,
            'cord_type': draft['cordType'] ?? 'silicone_stretch',
            'bead_recipe': draft['beads'] ?? [],
            'calculated_price_cents': ((draft['totalPrice'] ?? 0.0) * 100).round(),
            'is_public': false,
          });

          draft['syncedToCloud'] = true;
          await _draftsBox!.put(key, jsonEncode(draft));
          syncedCount++;
        }
      }
      return syncedCount;
    } catch (e) {
      debugPrint('[INFO] Offline or background sync deferred: $e');
      return 0;
    }
  }
}
