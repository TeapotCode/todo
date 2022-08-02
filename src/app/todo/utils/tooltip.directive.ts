import {Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {

  @Input() tooltip = '';
  @Input() delay: number = 50;

  private myPopup!: HTMLDivElement;
  private timer: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnDestroy(): void {
    if (this.myPopup) { this.myPopup.remove() }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      let x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;
      let y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight + 6;
      this.createTooltipPopup(x, y);
    }, this.delay)
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) { this.renderer.removeChild(this.el.nativeElement, this.myPopup); }
  }

  private createTooltipPopup(x: number, y: number) {
    let popup = this.renderer.createElement('div')
    this.renderer.appendChild(popup, this.renderer.createText(this.tooltip))
    this.renderer.addClass(popup, 'tooltip-container');

    this.renderer.setStyle(popup,'top',y.toString() + "px")
    this.renderer.setStyle(popup,'left',x.toString() + "px")

    this.renderer.appendChild(this.el.nativeElement, popup)

    this.myPopup = popup;
    setTimeout(() => {
      if (this.myPopup) this.myPopup.remove();
    }, 5000);
  }

}
