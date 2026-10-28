import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace, kayoBorder, kayoRadius, kayoShadow } from '../../foundations/tokens';

export interface DataTableColumn {
  key: string;
  label: string;
  flex?: number;
  align?: 'left' | 'right' | 'center';
  minWidth?: number;
  headerContent?: ReactNode;
}

export interface DataTableRow {
  id: string;
  [key: string]: ReactNode;
}

interface DataTableProps {
  columns: DataTableColumn[];
  data: DataTableRow[];
  onRowPress?: (row: DataTableRow) => void;
  emptyText?: string;
}

function Cell({
  children,
  flex,
  align,
  minWidth,
  isLast,
}: {
  children: ReactNode;
  flex: number;
  align: 'left' | 'right' | 'center';
  minWidth?: number;
  isLast: boolean;
}) {
  return (
    <View
      style={[
        s.cell,
        { flex, minWidth },
        !isLast && s.cellBorder,
        align === 'right' && { alignItems: 'flex-end' },
        align === 'center' && { alignItems: 'center' },
      ]}
    >
      {children}
    </View>
  );
}

export function DataTable({ columns, data, onRowPress, emptyText = 'No records.' }: DataTableProps) {
  return (
    <View style={s.table}>
      {/* Header */}
      <View style={s.header}>
        {columns.map((col, i) => (
          <Cell
            key={col.key}
            flex={col.flex ?? 1}
            align={col.align ?? 'left'}
            minWidth={col.minWidth}
            isLast={i === columns.length - 1}
          >
            {col.headerContent ?? <Text style={s.headerText}>{col.label}</Text>}
          </Cell>
        ))}
      </View>

      {/* Rows */}
      {data.length === 0 ? (
        <View style={s.emptyRow}>
          <Text style={[typography.body_sm, { color: theme.text.tertiary }]}>{emptyText}</Text>
        </View>
      ) : (
        data.map((row, rowIdx) => (
          <Pressable
            key={row.id}
            onPress={onRowPress ? () => onRowPress(row) : undefined}
            style={({ pressed }) => [
              s.row,
              rowIdx % 2 === 1 && s.rowAlt,
              rowIdx < data.length - 1 && s.rowBorder,
              pressed && onRowPress && s.rowPressed,
            ]}
            testID={`table-row-${row.id}`}
          >
            {columns.map((col, i) => (
              <Cell
                key={col.key}
                flex={col.flex ?? 1}
                align={col.align ?? 'left'}
                minWidth={col.minWidth}
                isLast={i === columns.length - 1}
              >
                {typeof row[col.key] === 'string' || typeof row[col.key] === 'number' ? (
                  <Text
                    style={[typography.body_sm, { color: theme.text.primary }]}
                    numberOfLines={1}
                  >
                    {String(row[col.key])}
                  </Text>
                ) : (
                  row[col.key] as ReactNode
                )}
              </Cell>
            ))}
          </Pressable>
        ))
      )}
    </View>
  );
}

const s = StyleSheet.create({
  table: {
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    overflow: 'hidden',
    backgroundColor: theme.surface.card,
    // Hard offset shadow (neo-brutalist)
    ...kayoShadow.md,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: theme.surface.sunken,
    borderBottomWidth: kayoBorder.width,
    borderBottomColor: theme.border.strong,
  },
  headerText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.5,
    color: theme.text.tertiary,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: theme.surface.card,
  },
  rowAlt: {
    backgroundColor: theme.surface.canvas,
  },
  rowBorder: {
    borderBottomWidth: kayoBorder.widthHairline,
    borderBottomColor: theme.border.subtle,
  },
  rowPressed: {
    backgroundColor: theme.surface.sunken,
  },
  cell: {
    paddingHorizontal: kayoSpace[3],
    paddingVertical: kayoSpace[3],
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cellBorder: {
    borderRightWidth: kayoBorder.widthHairline,
    borderRightColor: theme.border.subtle,
  },
  emptyRow: {
    padding: kayoSpace[5],
    alignItems: 'center',
  },
});
