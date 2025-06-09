import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterData {
  region: string;
  group: string;
  assetServiceRole: string;
  linkageSet: string;
  businessLine: string;
  segregationType: string;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Output() filtersApplied = new EventEmitter<FilterData>();
  @Output() filtersReset = new EventEmitter<void>();

  selectedRegion: string = '';
  selectedGroup: string = '';
  selectedAssetServiceRole: string = '';
  selectedLinkageSet: string = '';
  selectedBusinessLine: string = '';
  selectedSegregationType: string = '';

  // Loading states
  isApplying: boolean = false;
  isResetting: boolean = false;

  // Filter options
  regionOptions = [
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east', label: 'Middle East' }
  ];

  groupOptions = [
    { value: 'group-a', label: 'Group A' },
    { value: 'group-b', label: 'Group B' },
    { value: 'group-c', label: 'Group C' },
    { value: 'group-d', label: 'Group D' }
  ];

  assetServiceRoleOptions = [
    { value: 'custodian', label: 'Custodian' },
    { value: 'agent', label: 'Agent' },
    { value: 'counterparty', label: 'Counterparty' },
    { value: 'broker', label: 'Broker' },
    { value: 'dealer', label: 'Dealer' }
  ];

  linkageSetOptions = [
    { value: 'set-1', label: 'Linkage Set 1' },
    { value: 'set-2', label: 'Linkage Set 2' },
    { value: 'set-3', label: 'Linkage Set 3' },
    { value: 'set-4', label: 'Linkage Set 4' }
  ];

  businessLineOptions = [
    { value: 'securities', label: 'Securities' },
    { value: 'derivatives', label: 'Derivatives' },
    { value: 'fx', label: 'Foreign Exchange' },
    { value: 'commodities', label: 'Commodities' },
    { value: 'fixed-income', label: 'Fixed Income' }
  ];

  segregationTypeOptions = [
    { value: 'fully-segregated', label: 'Fully Segregated' },
    { value: 'partially-segregated', label: 'Partially Segregated' },
    { value: 'non-segregated', label: 'Non-Segregated' },
    { value: 'omnibus', label: 'Omnibus' }
  ];

  applyFilters(): void {
    this.isApplying = true;

    const filters: FilterData = {
      region: this.selectedRegion,
      group: this.selectedGroup,
      assetServiceRole: this.selectedAssetServiceRole,
      linkageSet: this.selectedLinkageSet,
      businessLine: this.selectedBusinessLine,
      segregationType: this.selectedSegregationType
    };

    // Simulate API call delay
    setTimeout(() => {
      console.log('Applying filters:', filters);
      this.filtersApplied.emit(filters);
      this.isApplying = false;
    }, 1000);
  }

  resetFilters(): void {
    this.isResetting = true;

    // Simulate reset delay
    setTimeout(() => {
      this.selectedRegion = '';
      this.selectedGroup = '';
      this.selectedAssetServiceRole = '';
      this.selectedLinkageSet = '';
      this.selectedBusinessLine = '';
      this.selectedSegregationType = '';

      console.log('Filters reset');
      this.filtersReset.emit();
      this.isResetting = false;
    }, 500);
  }

  hasActiveFilters(): boolean {
    return !!(
      this.selectedRegion ||
      this.selectedGroup ||
      this.selectedAssetServiceRole ||
      this.selectedLinkageSet ||
      this.selectedBusinessLine ||
      this.selectedSegregationType
    );
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.selectedRegion) count++;
    if (this.selectedGroup) count++;
    if (this.selectedAssetServiceRole) count++;
    if (this.selectedLinkageSet) count++;
    if (this.selectedBusinessLine) count++;
    if (this.selectedSegregationType) count++;
    return count;
  }

  getOptionLabel(options: any[], value: string): string {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  }
}
