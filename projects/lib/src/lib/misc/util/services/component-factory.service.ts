import {
  ApplicationRef,
  ComponentRef, inject,
  Injectable,
  Injector,
  Provider,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

export interface IImplicitContext<T> {
    $implicit?:T;
}

@Injectable()
export class SuiComponentFactory {
  private readonly _applicationRef = inject(ApplicationRef);
  private readonly _componentFactoryResolver = inject(ViewContainerRef);
  private _injector = inject(Injector);

  public createComponent<T>(type: Type<T>, providers: Provider[] = []): ComponentRef<T> {
    // Resolve and create an injector with the specified providers.
    const injector = Injector.create({
      providers: providers,
      parent: this._injector,
    });

    // Create a component using the previously resolved factory & injector.
    return this._componentFactoryResolver.createComponent(type as Type<T>, {
      injector,
    });
  }

    public createView<T, U extends IImplicitContext<T>>(viewContainer:ViewContainerRef, template:TemplateRef<U>, context:U):void {
        viewContainer.createEmbeddedView<U>(template, context);
    }

    // Inserts the component into the specified view container.
    public attachToView<T>(componentRef:ComponentRef<T>, viewContainer:ViewContainerRef):void {
        viewContainer.insert(componentRef.hostView, 0);
    }

    // Inserts the component in the root application node.
    public attachToApplication<T>(componentRef:ComponentRef<T>):void {
        this._applicationRef.attachView(componentRef.hostView);
    }

    // Detaches the component from the root application node.
    public detachFromApplication<T>(componentRef:ComponentRef<T>):void {
        this._applicationRef.detachView(componentRef.hostView);
    }

    // Moves the component to the specified DOM element.
    public moveToElement<T>(componentRef:ComponentRef<T>, element:Element):void {
        element.appendChild(componentRef.location.nativeElement);
    }

    // Moves the component to the document body.
    public moveToDocumentBody<T>(componentRef:ComponentRef<T>):void {
        this.moveToElement(componentRef, document.querySelector("body")!);
    }

    public detachFromDocument<T>(componentRef:ComponentRef<T>):void {
        const element = componentRef.location.nativeElement as Element;
        // We can't use `element.remove()` due to lack of IE11 support.
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
}
