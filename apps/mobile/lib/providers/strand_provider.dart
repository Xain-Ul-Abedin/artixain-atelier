import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/gemstone_model.dart';
import '../models/strand_item_model.dart';

class StrandState {
  final List<StrandItemModel> beads;
  final double targetWristSizeCm;
  final int selectedDiameter;
  final String cordType;
  final int? selectedIndex;
  final double rotationAngle;
  final bool hapticsEnabled;

  const StrandState({
    required this.beads,
    this.targetWristSizeCm = 16.5,
    this.selectedDiameter = 8,
    this.cordType = 'silicone_stretch',
    this.selectedIndex,
    this.rotationAngle = 0.0,
    this.hapticsEnabled = true,
  });

  double get calculatedCircumferenceCm {
    final totalMm = beads.fold<int>(0, (sum, b) => sum + b.diameterMm);
    return double.parse((totalMm / 10.0).toStringAsFixed(2));
  }

  double get fitDifferenceMm {
    final targetMm = targetWristSizeCm * 10.0;
    final strandMm = calculatedCircumferenceCm * 10.0;
    return double.parse((strandMm - targetMm).toStringAsFixed(1));
  }

  String get fitStatus {
    if (fitDifferenceMm.abs() <= 6.0) return 'perfect';
    if (fitDifferenceMm > 6.0) return 'loose';
    return 'tight';
  }

  double get totalPrice {
    final sum = beads.fold<double>(0.0, (acc, b) => acc + b.price);
    return double.parse(sum.toStringAsFixed(2));
  }

  String get designToken {
    final wristMm = (targetWristSizeCm * 10).round();
    final cordCode = cordType == 'braided_silk' ? 'slk' : 'sil';
    final beadString = beads.map((b) => '${b.code}${b.diameterMm}').join('-');
    return 'artx.v1.$wristMm.$cordCode.$beadString';
  }

  StrandState copyWith({
    List<StrandItemModel>? beads,
    double? targetWristSizeCm,
    int? selectedDiameter,
    String? cordType,
    int? selectedIndex,
    bool clearSelectedIndex = false,
    double? rotationAngle,
    bool? hapticsEnabled,
  }) {
    return StrandState(
      beads: beads ?? this.beads,
      targetWristSizeCm: targetWristSizeCm ?? this.targetWristSizeCm,
      selectedDiameter: selectedDiameter ?? this.selectedDiameter,
      cordType: cordType ?? this.cordType,
      selectedIndex: clearSelectedIndex ? null : (selectedIndex ?? this.selectedIndex),
      rotationAngle: rotationAngle ?? this.rotationAngle,
      hapticsEnabled: hapticsEnabled ?? this.hapticsEnabled,
    );
  }
}

class StrandNotifier extends StateNotifier<StrandState> {
  StrandNotifier()
      : super(
          StrandState(
            beads: _createStarterStrand(),
          ),
        );

  static List<StrandItemModel> _createStarterStrand() {
    const starterCodes = [
      'OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP',
      'OBS', 'OBS', 'TIG', 'GSP', 'OBS', 'OBS', 'TIG', 'GSP',
      'OBS', 'OBS', 'TIG', 'GSP'
    ];
    return starterCodes.asMap().entries.map((entry) {
      final idx = entry.key;
      final code = entry.value;
      final gem = getGemstoneByCode(code);
      final diam = gem.isSpacer ? 6 : 8;
      return StrandItemModel(
        id: 'bead_${idx}_${DateTime.now().microsecondsSinceEpoch}',
        gemstoneId: gem.id,
        code: gem.code,
        name: gem.name,
        diameterMm: diam,
        colorHex: gem.colorHex,
        secondaryColorHex: gem.secondaryColorHex,
        textureType: gem.textureType,
        isSpacer: gem.isSpacer,
        price: gem.getPrice(diam),
      );
    }).toList();
  }

  void _triggerHaptic() {
    if (state.hapticsEnabled) {
      HapticFeedback.lightImpact();
    }
  }

  void setTargetWristSize(double sizeCm) {
    state = state.copyWith(targetWristSizeCm: sizeCm);
    _triggerHaptic();
  }

  void setSelectedDiameter(int diameterMm) {
    state = state.copyWith(selectedDiameter: diameterMm);
    _triggerHaptic();
  }

  void setSelectedIndex(int? index) {
    state = state.copyWith(selectedIndex: index, clearSelectedIndex: index == null);
    _triggerHaptic();
  }

  void setRotationAngle(double angle) {
    state = state.copyWith(rotationAngle: angle);
  }

  void addBead(GemstoneModel gem, [int? customDiameter]) {
    final diam = customDiameter ?? (gem.isSpacer ? 6 : state.selectedDiameter);
    final newBead = StrandItemModel(
      id: 'bead_${DateTime.now().millisecondsSinceEpoch}_${state.beads.length}',
      gemstoneId: gem.id,
      code: gem.code,
      name: gem.name,
      diameterMm: diam,
      colorHex: gem.colorHex,
      secondaryColorHex: gem.secondaryColorHex,
      textureType: gem.textureType,
      isSpacer: gem.isSpacer,
      price: gem.getPrice(diam),
    );

    state = state.copyWith(beads: [...state.beads, newBead]);
    _triggerHaptic();
  }

  void insertBeadAt(int index, GemstoneModel gem, [int? customDiameter]) {
    final diam = customDiameter ?? (gem.isSpacer ? 6 : state.selectedDiameter);
    final newBead = StrandItemModel(
      id: 'bead_${DateTime.now().millisecondsSinceEpoch}_$index',
      gemstoneId: gem.id,
      code: gem.code,
      name: gem.name,
      diameterMm: diam,
      colorHex: gem.colorHex,
      secondaryColorHex: gem.secondaryColorHex,
      textureType: gem.textureType,
      isSpacer: gem.isSpacer,
      price: gem.getPrice(diam),
    );

    final list = [...state.beads];
    list.insert(index, newBead);
    state = state.copyWith(beads: list);
    _triggerHaptic();
  }

  void removeBeadAt(int index) {
    if (index < 0 || index >= state.beads.length) return;
    final list = [...state.beads]..removeAt(index);
    state = state.copyWith(beads: list, clearSelectedIndex: true);
    _triggerHaptic();
  }

  void replaceBeadAt(int index, GemstoneModel gem) {
    if (index < 0 || index >= state.beads.length) return;
    final targetDiam = gem.isSpacer ? 6 : state.beads[index].diameterMm;
    final updated = StrandItemModel(
      id: state.beads[index].id,
      gemstoneId: gem.id,
      code: gem.code,
      name: gem.name,
      diameterMm: targetDiam,
      colorHex: gem.colorHex,
      secondaryColorHex: gem.secondaryColorHex,
      textureType: gem.textureType,
      isSpacer: gem.isSpacer,
      price: gem.getPrice(targetDiam),
    );

    final list = [...state.beads];
    list[index] = updated;
    state = state.copyWith(beads: list);
    _triggerHaptic();
  }

  void reorderBeads(int fromIndex, int toIndex) {
    if (fromIndex < 0 || fromIndex >= state.beads.length || toIndex < 0 || toIndex >= state.beads.length) {
      return;
    }
    final list = [...state.beads];
    final moved = list.removeAt(fromIndex);
    list.insert(toIndex, moved);
    state = state.copyWith(beads: list, selectedIndex: toIndex);
    _triggerHaptic();
  }

  void applyBilateralSymmetry() {
    if (state.beads.length < 2) return;
    final halfLen = state.beads.length ~/ 2;
    final firstHalf = state.beads.sublist(0, halfLen);
    final mirroredHalf = firstHalf.reversed.map((b) => b.copyWith(id: 'mir_${b.id}')).toList();

    List<StrandItemModel> result;
    if (state.beads.length % 2 == 1) {
      result = [...firstHalf, state.beads[halfLen], ...mirroredHalf];
    } else {
      result = [...firstHalf, ...mirroredHalf];
    }

    state = state.copyWith(beads: result);
    _triggerHaptic();
  }

  void applyQuadrantSymmetry() {
    if (state.beads.length < 4) return;
    final quarterLen = (state.beads.length ~/ 4).clamp(1, state.beads.length);
    final unit = state.beads.sublist(0, quarterLen);

    final result = <StrandItemModel>[];
    for (int q = 0; q < 4; q++) {
      for (var b in unit) {
        result.add(b.copyWith(id: 'q${q}_${b.id}'));
      }
    }

    state = state.copyWith(beads: result);
    _triggerHaptic();
  }

  void applyAlternatingSpacers(GemstoneModel spacerGem) {
    final nonSpacers = state.beads.where((b) => !b.isSpacer).toList();
    final result = <StrandItemModel>[];

    for (int i = 0; i < nonSpacers.length; i++) {
      result.add(nonSpacers[i]);
      result.add(StrandItemModel(
        id: 'spacer_${i}_${DateTime.now().millisecondsSinceEpoch}',
        gemstoneId: spacerGem.id,
        code: spacerGem.code,
        name: spacerGem.name,
        diameterMm: 6,
        colorHex: spacerGem.colorHex,
        secondaryColorHex: spacerGem.secondaryColorHex,
        textureType: spacerGem.textureType,
        isSpacer: true,
        price: spacerGem.getPrice(6),
      ));
    }

    state = state.copyWith(beads: result);
    _triggerHaptic();
  }

  void clearStrand() {
    state = state.copyWith(beads: [], clearSelectedIndex: true);
    _triggerHaptic();
  }

  bool loadFromToken(String token) {
    if (token.isEmpty) return false;
    var cleanToken = token.trim();
    if (cleanToken.startsWith('artx.')) {
      cleanToken = cleanToken.substring(5);
    }

    final parts = cleanToken.split('.');
    if (parts.length < 4 || parts[0] != 'v1') return false;

    final wristMm = int.tryParse(parts[1]) ?? 165;
    final wristCm = double.parse((wristMm / 10.0).toStringAsFixed(1));

    final beadSegments = parts[3].split('-').where((s) => s.length >= 3);
    if (beadSegments.isEmpty) return false;

    final loadedBeads = beadSegments.map((segment) {
      final match = RegExp(r'^([A-Z0-9]+?)(\d{1,2})$').firstMatch(segment);
      final code = match?.group(1) ?? 'OBS';
      final diam = int.tryParse(match?.group(2) ?? '8') ?? 8;
      final gem = getGemstoneByCode(code);

      return StrandItemModel(
        id: 'token_${DateTime.now().microsecondsSinceEpoch}',
        gemstoneId: gem.id,
        code: gem.code,
        name: gem.name,
        diameterMm: diam,
        colorHex: gem.colorHex,
        secondaryColorHex: gem.secondaryColorHex,
        textureType: gem.textureType,
        isSpacer: gem.isSpacer,
        price: gem.getPrice(diam),
      );
    }).toList();

    state = state.copyWith(
      targetWristSizeCm: wristCm,
      beads: loadedBeads,
      clearSelectedIndex: true,
    );
    _triggerHaptic();
    return true;
  }
}

final strandProvider = StateNotifierProvider<StrandNotifier, StrandState>((ref) {
  return StrandNotifier();
});
