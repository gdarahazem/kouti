import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartCardComponent } from '../chart-card/chart-card.component';
import { FilterBarComponent, FilterData } from '../filter-bar/filter-bar.component';

export interface ChartData {
  label: string;
  value: number;
  color: string;
}

export interface AlertData {
  type: string;
  count: number;
  color: string;
}

export interface SummaryData {
  label: string;
  value: number;
  barColor: string;
}

export interface DashboardCard {
  title: string;
  data: ChartData[];
  type: 'donut' | 'bar' | 'status' | 'summary';
  alerts?: AlertData[];
  summary?: SummaryData[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartCardComponent, FilterBarComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  lastUpdated: Date = new Date();
  autoRefresh: boolean = false;
  nextRefresh: Date | null = null;
  private refreshInterval: any;

  // Dashboard data
  callsRecallsData: DashboardCard = {
    title: 'Calls and Recalls',
    type: 'donut',
    data: [
      { label: 'Awaiting Action', value: 215, color: '#EF4444' },
      { label: 'Processing Call', value: 151, color: '#9CA3AF' },
      { label: 'Call Past Notification Time', value: 238, color: '#7C2D12' }
    ]
  };

  deliveriesReturnsData: DashboardCard = {
    title: 'Deliveries and Returns',
    type: 'donut',
    data: [
      { label: 'Awaiting Action', value: 358, color: '#EF4444' },
      { label: 'Processing Call', value: 34, color: '#9CA3AF' },
      { label: 'Call Past Notification Time', value: 393, color: '#7C2D12' }
    ]
  };

  substitutionsData: DashboardCard = {
    title: 'Substitutions',
    type: 'donut',
    data: [
      { label: 'Substitution Requests', value: 98, color: '#7C2D12' },
      { label: 'Substitution Confirmations', value: 54, color: '#9CA3AF' }
    ]
  };

  noCallsData: DashboardCard = {
    title: 'No Calls',
    type: 'donut',
    data: [
      { label: 'No Calls Required', value: 431, color: '#7C2D12' },
      { label: 'Completed', value: 12, color: '#EF4444' }
    ]
  };

  agreementAlertsData: DashboardCard = {
    title: 'Agreement Alerts',
    type: 'status',
    data: [],
    alerts: [
      { type: 'Concentration Limits Breached', count: 20, color: '#EF4444' },
      { type: 'IM Threshold Breaches', count: 2, color: '#EF4444' },
      { type: 'Ineligible Asset', count: 17, color: '#EF4444' },
      { type: 'Failed Statement', count: 11, color: '#EF4444' }
    ]
  };

  collateralSettlementData: DashboardCard = {
    title: 'Collateral Settlement Summary',
    type: 'summary',
    data: [],
    summary: [
      { label: 'System Draft', value: 476, barColor: '#F3F4F6' },
      { label: 'Pending', value: 630, barColor: '#FCA5A5' },
      { label: 'Query', value: 2, barColor: '#F3F4F6' },
      { label: 'Authorised', value: 1, barColor: '#F3F4F6' },
      { label: 'Pending Release', value: 5, barColor: '#F3F4F6' },
      { label: 'Pending Settlement', value: 331, barColor: '#DC2626' },
      { label: 'Outstanding Settlement', value: 4, barColor: '#F3F4F6' },
      { label: 'Failed', value: 12, barColor: '#374151' },
      { label: 'Reverse Failed', value: 0, barColor: '#F3F4F6' },
      { label: 'Mirrored Failed', value: 0, barColor: '#F3F4F6' }
    ]
  };

  internalReviewData: DashboardCard = {
    title: 'Internal Review',
    type: 'donut',
    data: [
      { label: 'Calls Recalls', value: 36, color: '#7C2D12' },
      { label: 'Deliveries Returns', value: 74, color: '#FCA5A5' },
      { label: 'No Calls', value: 115, color: '#9CA3AF' }
    ]
  };

  approvalsManagementData: DashboardCard = {
    title: 'Approvals Management',
    type: 'summary',
    data: [],
    summary: [
      { label: 'Organisation', value: 4, barColor: '#F3F4F6' },
      { label: 'Agreements', value: 22, barColor: '#F3F4F6' },
      { label: 'Statements', value: 31, barColor: '#F3F4F6' },
      { label: 'Workflow', value: 0, barColor: '#F3F4F6' },
      { label: 'Trades', value: 0, barColor: '#F3F4F6' },
      { label: 'Settlement Instructions', value: 5, barColor: '#F3F4F6' },
      { label: 'Securities Data', value: 38, barColor: '#F3F4F6' },
      { label: 'Eligibility Rules Template', value: 24, barColor: '#F3F4F6' }
    ]
  };

  todaysEventsData: DashboardCard = {
    title: "Today's Events",
    type: 'status',
    data: [
      { label: 'Actioned', value: 0, color: '#EF4444' },
      { label: 'Not Actioned', value: 0, color: '#7C2D12' }
    ]
  };

  interestSummaryLastMonthData: DashboardCard = {
    title: 'Interest Summary - for last month',
    type: 'donut',
    data: [
      { label: 'Outstanding', value: 213, color: '#7C2D12' },
      { label: 'Applied', value: 16, color: '#FCA5A5' }
    ]
  };

  interestSummaryTodayData: DashboardCard = {
    title: 'Interest Summary - up to today',
    type: 'bar',
    data: [
      { label: 'Pay', value: 18, color: '#9CA3AF' },
      { label: 'Query', value: 0, color: '#D1D5DB' },
      { label: 'Authorised', value: 0, color: '#FCA5A5' },
      { label: 'Pending Release', value: 0, color: '#DC2626' },
      { label: 'Pending Settlement', value: 0, color: '#7C2D12' },
      { label: 'Receive', value: 0, color: '#9CA3AF' },
      { label: 'Capitalise Pay', value: 7, color: '#7C2D12' },
      { label: 'Capitalise Receive', value: 0, color: '#9CA3AF' }
    ]
  };

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  private loadDashboardData(): void {
    // Simulate loading delay
    setTimeout(() => {
      this.isLoading = false;
      this.lastUpdated = new Date();
    }, 2000);
  }

  onFiltersApplied(filters: FilterData): void {
    console.log('Filters applied in dashboard:', filters);
    this.isLoading = true;

    // Simulate API call with filters
    setTimeout(() => {
      this.loadDashboardData();
      // Here you would typically call your service to fetch filtered data
    }, 1000);
  }

  onFiltersReset(): void {
    console.log('Filters reset in dashboard');
    this.isLoading = true;

    // Reload default data
    setTimeout(() => {
      this.loadDashboardData();
    }, 500);
  }

  toggleAutoRefresh(): void {
    if (this.autoRefresh) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }

  private startAutoRefresh(): void {
    this.updateNextRefreshTime();
    this.refreshInterval = setInterval(() => {
      this.refreshData();
      this.updateNextRefreshTime();
    }, 30000); // Refresh every 30 seconds
  }

  private stopAutoRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.nextRefresh = null;
    }
  }

  private updateNextRefreshTime(): void {
    this.nextRefresh = new Date(Date.now() + 30000);
  }

  private refreshData(): void {
    console.log('Auto-refreshing dashboard data...');
    this.lastUpdated = new Date();
    // Here you would call your service to refresh data
  }

  getNextRefreshTime(): string {
    if (!this.nextRefresh) return '';
    const seconds = Math.ceil((this.nextRefresh.getTime() - Date.now()) / 1000);
    return `${seconds}s`;
  }

  // Quick stats calculations
  getTotalCalls(): number {
    return this.callsRecallsData.data.reduce((sum, item) => sum + item.value, 0);
  }

  getTotalDeliveries(): number {
    return this.deliveriesReturnsData.data.reduce((sum, item) => sum + item.value, 0);
  }

  getTotalAlerts(): number {
    return this.agreementAlertsData.alerts?.reduce((sum, alert) => sum + alert.count, 0) || 0;
  }

  getTotalSettlements(): number {
    return this.collateralSettlementData.summary?.reduce((sum, item) => sum + item.value, 0) || 0;
  }
}
