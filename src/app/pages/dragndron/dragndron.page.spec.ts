import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragndronPage } from './dragndron.page';

describe('DragndronPage', () => {
  let component: DragndronPage;
  let fixture: ComponentFixture<DragndronPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DragndronPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
