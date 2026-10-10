import 'package:flutter/material.dart';

enum PillButtonVariant { primary, secondary, gold, tonal }

class PillButton extends StatelessWidget {
  final String label;
  final IconData? icon;
  final VoidCallback? onPressed;
  final PillButtonVariant variant;
  final double height;
  final bool isFullWidth;

  const PillButton({
    super.key,
    required this.label,
    this.icon,
    this.onPressed,
    this.variant = PillButtonVariant.primary,
    this.height = 48.0,
    this.isFullWidth = false,
  });

  @override
  Widget build(BuildContext context) {
    Color bg;
    Color fg;
    Border? border;

    switch (variant) {
      case PillButtonVariant.primary:
        bg = Theme.of(context).brightness == Brightness.dark ? Colors.white : const Color(0xFF0F1115);
        fg = Theme.of(context).brightness == Brightness.dark ? const Color(0xFF0F1115) : Colors.white;
        break;
      case PillButtonVariant.secondary:
        bg = Theme.of(context).brightness == Brightness.dark ? const Color(0xFF1E2028) : Colors.white;
        fg = Theme.of(context).brightness == Brightness.dark ? Colors.white : const Color(0xFF0F1115);
        border = Border.all(
          color: Theme.of(context).brightness == Brightness.dark
              ? Colors.white.withOpacity(0.12)
              : const Color(0xFFE5E5E0),
        );
        break;
      case PillButtonVariant.gold:
        bg = const Color(0xFFC5A059);
        fg = Colors.white;
        break;
      case PillButtonVariant.tonal:
        bg = Theme.of(context).brightness == Brightness.dark
            ? const Color(0xFF272A34)
            : const Color(0xFFF0F0EC);
        fg = Theme.of(context).brightness == Brightness.dark ? Colors.white : const Color(0xFF18181B);
        break;
    }

    Widget content = Container(
      height: height,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(height / 2), // Exact 50% boundary radius
        border: border,
        boxShadow: variant == PillButtonVariant.primary || variant == PillButtonVariant.gold
            ? [
                BoxShadow(
                  color: bg.withOpacity(0.25),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ]
            : null,
      ),
      child: Row(
        mainAxisSize: isFullWidth ? MainAxisSize.max : MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 16, color: fg),
            const SizedBox(width: 8),
          ],
          Text(
            label,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: fg,
              letterSpacing: 0.2,
            ),
          ),
        ],
      ),
    );

    return InkWell(
      onTap: onPressed,
      borderRadius: BorderRadius.circular(height / 2),
      child: isFullWidth ? SizedBox(width: double.infinity, child: content) : content,
    );
  }
}
