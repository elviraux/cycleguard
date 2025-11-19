import { Paths, File } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { UserData } from '@/types/cycle';

/**
 * Generate CSV content from user data
 */
export function generateCSV(userData: UserData): string {
  // CSV Header
  const header = 'date,is_period_day,symptoms,notes\n';

  // Collect all unique dates
  const dateMap = new Map<string, {
    isPeriodDay: boolean;
    symptoms: string;
    notes: string;
  }>();

  // Add period days
  userData.periodDays.forEach(pd => {
    dateMap.set(pd.date, {
      isPeriodDay: true,
      symptoms: '',
      notes: '',
    });
  });

  // Add symptom logs
  userData.symptomLogs.forEach(log => {
    const existing = dateMap.get(log.date) || {
      isPeriodDay: false,
      symptoms: '',
      notes: '',
    };

    dateMap.set(log.date, {
      ...existing,
      symptoms: log.symptoms.join('; '),
      notes: log.notes,
    });
  });

  // Sort dates
  const sortedDates = Array.from(dateMap.keys()).sort();

  // Generate CSV rows
  const rows = sortedDates.map(date => {
    const data = dateMap.get(date)!;
    const isPeriodDay = data.isPeriodDay ? 'Yes' : 'No';
    const symptoms = escapeCSVField(data.symptoms);
    const notes = escapeCSVField(data.notes);

    return `${date},${isPeriodDay},${symptoms},${notes}`;
  });

  return header + rows.join('\n');
}

/**
 * Escape CSV field (handle commas, quotes, newlines)
 */
function escapeCSVField(field: string): string {
  if (!field) return '';

  // If field contains comma, quote, or newline, wrap in quotes and escape quotes
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }

  return field;
}

/**
 * Export user data as CSV file
 */
export async function exportToCSV(userData: UserData): Promise<void> {
  try {
    // Generate CSV content
    const csvContent = generateCSV(userData);

    // Create filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `cycleguard_export_${date}.csv`;
    const file = new File(Paths.document, filename);

    // Write CSV to file
    await file.write(csvContent);

    // Check if sharing is available
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      throw new Error('Sharing is not available on this device');
    }

    // Share the file
    await Sharing.shareAsync(file.uri, {
      mimeType: 'text/csv',
      dialogTitle: 'Export Cycle Data',
      UTI: 'public.comma-separated-values-text',
    });
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
}
