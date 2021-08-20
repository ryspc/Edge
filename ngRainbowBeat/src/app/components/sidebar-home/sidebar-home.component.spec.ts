import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHomeComponent } from './sidebar-home.component';

describe('SidebarComponent', () => {
  let component: SidebarHomeComponent;
  let fixture: ComponentFixture<SidebarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
