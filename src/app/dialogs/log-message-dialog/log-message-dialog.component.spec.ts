import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMessageDialogComponent } from './log-message-dialog.component';

describe('LogMessageDialogComponent', () => {
  let component: LogMessageDialogComponent;
  let fixture: ComponentFixture<LogMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogMessageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
