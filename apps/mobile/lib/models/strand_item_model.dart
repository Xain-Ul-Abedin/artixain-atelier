class StrandItemModel {
  final String id;
  final String gemstoneId;
  final String code;
  final String name;
  final int diameterMm;
  final String colorHex;
  final String? secondaryColorHex;
  final String textureType;
  final bool isSpacer;
  final double price;

  const StrandItemModel({
    required this.id,
    required this.gemstoneId,
    required this.code,
    required this.name,
    required this.diameterMm,
    required this.colorHex,
    this.secondaryColorHex,
    required this.textureType,
    this.isSpacer = false,
    required this.price,
  });

  StrandItemModel copyWith({
    String? id,
    String? gemstoneId,
    String? code,
    String? name,
    int? diameterMm,
    String? colorHex,
    String? secondaryColorHex,
    String? textureType,
    bool? isSpacer,
    double? price,
  }) {
    return StrandItemModel(
      id: id ?? this.id,
      gemstoneId: gemstoneId ?? this.gemstoneId,
      code: code ?? this.code,
      name: name ?? this.name,
      diameterMm: diameterMm ?? this.diameterMm,
      colorHex: colorHex ?? this.colorHex,
      secondaryColorHex: secondaryColorHex ?? this.secondaryColorHex,
      textureType: textureType ?? this.textureType,
      isSpacer: isSpacer ?? this.isSpacer,
      price: price ?? this.price,
    );
  }
}
