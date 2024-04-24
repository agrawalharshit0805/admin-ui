import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize } from 'rxjs/operators';
import { MaintenancePeriodDetailComponent } from './../maintenance-period-detail/maintenance-period-detail.component';

@Component({
  selector: 'app-maintenance-period-list',
  templateUrl: './maintenance-period-list.component.html',
  styleUrl: './maintenance-period-list.component.css'
})

export class MaintenancePeriodListComponent implements OnInit {
  maintenancePeriods: any[] = [];
  loading = false;
  now = Date.now();
  federalServer = false; // This should ideally come from a shared service or state management solution
  maintenancePeriodsFilters: any = {
    name: ''
  };

  maintenancePeriodTableConfig!: MatTableDataSource<any>;
  item: any;

  constructor(private http: HttpClient, private toastr: ToastrService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadMaintenancePeriods();
  }

  loadMaintenancePeriods() {
    this.loading = true;
    const params = new HttpParams()
      .set('sort', 'start;desc')
      .set('count', '20')
      .set('page', '0')
      .set('filters', this.encodeFilters());

    this.http.get<{ total: number; elements: any[] }>('admin-rest/api/v1/maintenanceperiods', { params })
      .pipe(
        finalize(() => this.loading = false),
        catchError(error => {
          this.toastr.error(`Error getting maintenance periods: ${error.message}`);
          throw error;
        })
      )
      .subscribe(data => {
        this.maintenancePeriods = data.elements;
        this.maintenancePeriodTableConfig = new MatTableDataSource(this.maintenancePeriods);
      });
  }

  encodeFilters(): string {
    return Object.keys(this.maintenancePeriodsFilters) // Get an array of keys from maintenancePeriodsFilters object
        .map(key => `${key};${this.maintenancePeriodsFilters[key]}`) // Map each key-value pair to a string in the format "key;value"
        .join('%7C'); // Join the array of strings with '%7C' separator
  }


  openCreateDialog() {
    const nowStartDate = this.dateOnlyHours(new Date());
    const nowEndDate = this.dateOnlyHours(new Date());
    this.item = {
        startDate : nowStartDate,
        endDate : nowEndDate,
        startHour : 0,
        endHour : 23,
        mois : []
    };

    const dialogRef = this.dialog.open(MaintenancePeriodDetailComponent, {
        data: { type: 'create', item: this.item } // Pass item data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.loadMaintenancePeriods();
        }
    });
  }

  edit(maintenancePeriod: any) {
    // Copy maintenancePeriod data to item object
    this.item = { ...maintenancePeriod };

    // Convert start and end dates to Date objects and set hours
    this.item.startDate = this.dateOnlyHours(new Date(this.item.start));
    this.item.endDate = this.dateOnlyHours(new Date(this.item.end));
    this.item.startHour = this.item.startDate.getHours();
    this.item.endHour = this.item.endDate.getHours();

    // Open dialog passing the item data
    const dialogRef = this.dialog.open(MaintenancePeriodDetailComponent, {
        data: { maintenancePeriod: this.item, type: 'edit' }
    });

    // Subscribe to dialog close event
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.loadMaintenancePeriods(); // Reload data if needed
        }
    });
  }

  del(maintenancePeriod: any) {
    if (confirm(`Are you sure you want to delete this maintenance period: ${maintenancePeriod.name}?`)) {
        this.http.delete(`admin-rest/api/v1/maintenanceperiods/${maintenancePeriod.id}`)
            .pipe(
                catchError(error => {
                    this.toastr.error(`Error deleting maintenance period: ${error.message}`);
                    throw error;
                })
            )
            .subscribe(() => {
                this.toastr.success('Maintenance period deleted successfully');
                this.loadMaintenancePeriods(); // Reload data if needed
            });
    }
  }

  // Function to set minutes and seconds to 0
  dateOnlyHours(date: Date): Date {
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }
}
