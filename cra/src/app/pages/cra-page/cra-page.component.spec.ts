import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraPageComponent } from './cra-page.component';

describe('CraPageComponent', () => {
  let component: CraPageComponent;
  let fixture: ComponentFixture<CraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
