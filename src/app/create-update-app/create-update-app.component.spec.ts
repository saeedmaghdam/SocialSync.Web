import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAppComponent } from './create-update-app.component';

describe('NewAppComponent', () => {
  let component: CreateUpdateAppComponent;
  let fixture: ComponentFixture<CreateUpdateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
