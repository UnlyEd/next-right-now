import { BaseTable } from '../../utils/api/fetchAirtableTable';
import { AirtableRecord } from './AirtableRecord';

/**
 * Dataset containing records split by table
 * Used to resolve links (relationships) between records
 *
 * @example { Customer: Customer[]> , Theme: Theme[]> }
 */
export declare type AirtableDataset = {
  [key in BaseTable]?: AirtableRecord[];
}
