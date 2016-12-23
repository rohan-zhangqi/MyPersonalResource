# 《Head First设计模式》笔记

Eirc Freeman & Elisabeth Freeman with Kathy Sierra & Bert Bates著  
中国电力出版社

书签： Page115

**设计原则**（Page 9）
> 找出应用中可能需要变化之处，把它们独立出来，不要和那些不需要变化的代码混在一起。

**设计原则**（Page 11）
> 针对接口编程，而不是针对实现编程。

“针对接口编程”真正的意思是“针对超类型（supertype）编程”
“针对超类型编程”这句话，可以更明确地说成“变量的声明类型应该是超类型，通常是一个抽象类或者是一个接口，如此，只要是具体实现此超类型的类所产生的对象，都可以指定给这个变量。这也意味着，声明类时不用理会以后执行时的真正对象类型！”

**设计原则**（Page 23）
> 多用组合，少用继承。


## 1、策略模式（Strategy Pattern）
> **策略模式**定义了算法族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用算法的客户。

书中示例关键词：鸭子、不同的样子、不同的飞行方式、不同的鸣叫方式

**批注：**  
指对象有某种行为，但是在不同的场景下，该行为有不同的实现算法。比如每个人都要交“个人所得税”，但是“在美国交个人所得税”和“在中国交个人所得税”就是不同的算税方法。  


良好的OO设计必须具备**可复用、可扩充、可维护**三个特性。

## 2、观察者模式（Observer Pattern）

出版者 + 订阅者 = 观察者模式 

> **观察者模式**定义了对象之间的一对多依赖，这样一来，当一个对象改变状态时，它的所有依赖者都会收到通知并自动更新。

书中例子关键词：气象站、不同的布告板、有数据更新立即通知布告板

**设计原则**（Page53）
> 为了交互对象之间的松耦合设计而努力。

**松耦合的设计之所以能让我们建立有弹性的OO系统，能够应对变化，是因为对象之间的互相依赖降到了最低。**

Java的java.util包内包含了最基本的Observer**接口**与Observable**类**。

java.util.Observable的黑暗面  
  
- Observable是一个类：因为Observable是一个“类”，你必须设计一个类继承它。如果某类想同时具有Observable类和另一个超类的行为，就会陷入两难。
- Observable将关键的方法保护起来：Observable中的setChanged()方法被保护了起来（被定义成protected），这样依赖，除非你继承自Observable，否则你无法创建Observable实例并组合到你自己的对象中来。

有多个观察者时，不可以依赖特定的通知次序。

## 3、装饰者模式（Decorator Pattern）

**设计原则**（Page86）
> 类应该对扩展开放，对修改关闭。

在选择需要被扩展的代码部分时要小心。每个地方都采用开放-关闭原则，是一种浪费，也没必要，还会导致代码变得负责且难以理解。

- 装饰者和被装饰对象有相同的超类型。
- 你可以用一个或多个装饰者包装一个对象。
- 既然装饰者和被装饰对象有相同的超类型，所以在任何需要原始对象（被包装的）场合，可以用装饰过的对象代替它。
- **装饰者可以在所委托被装饰者的行为之前与/或之后，加上自己的行为，以达到特定的目的。**
- 对象可以在任何时候被装饰，所以可以在运行时动态地、不限量地用你喜欢的装饰者来装饰对象。

> **装饰者模式**动态地将责任附加到对象上。若要扩展功能，装饰者提供了比继承更有弹性的替代方案。

书中例子关键词：星巴克咖啡、不同的咖啡、在咖啡中添加不同数量、不同种类的调料、计算咖啡的最终价格  

    /*
     * 饮料基类 
     */
    public abstract class Beverage {
    	String description = "Unknown Beverage";
    	public String getDescription() {
    		return description;
    	}
    	public abstract double cost();
    }
    
    /*
     *调料
     */  
    public abstract class CondimentDecorator extends Beverage {
    	public abstract String getDescription();
    }
    
    public class Espresso extends Beverage {
    	public Espresso() {
    		description = "Espresso";
    	}
    	public double cost(){
    		return 1.99;
    	}
    }
    
    public class HouseBlend extends Beverage {
    	public HouseBlend(){
    		description = "House Blend Coffee";
    	}
    	public double cost(){
    		return .89;
    	}
    }
    
    /*
     *摩卡
     */
    public class Mocha extends CondimentDecorator {
    	Beverage beverage;
    	public Mocha(Beverage beverage){
    		this.beverage = beverage;
    	}
    	public String getDescription(){
    		return beverage.getDescription() + "， Mocha";
    	}
    	public double cost(){
    		return .20 + beverage.cost();
    	}
    }
    
    public class StarbuzzCoffee {
    	public static void main(String args[]){
    		Beverage beverage = new Espresso();
    		System.out.println(beverage.getDescription() + " $" + beverage.cost());
    
    		Beverage beverage2 = new DarkRoast();
    		beverage2 = new Mocha(beverage2);
    		beverage2 = new Mocha(beverage2);
    		beverage2 = new Whip(beverage2);
    		System.out.println(beverage2.getDescription() + " $" + beverage2.cost());
    
    		Beverage beverage3 = new HouseBlend();
    		beverage3 = new Soy(beverage3);
    		beverage3 = new Mocha(beverage3);
			beverage3 = new Whip(beverage3);
    		System.out.println(beverage3.getDescription() + " $" + beverage3.cost());
    	}
    }

利用装饰者模式的Java API  
InputStream  
FileInputStream、StringBufferInputStream、ByteArrayInputStream、FilterInputStream  
PushbackInputStream、BufferedInputStream、DataInputStream、LineNumberInputStream

Java I/O在使用装饰者模式的同时，也引入了一个“缺点”：利用装饰者模式，常常造成设计中有大量的小类，数量实在太多，可能会造成使用此API程序员的困扰。

**装饰者会导致设计中出现许多小对象，如果过度使用，会让程序变得很复杂。**


## 4、工厂模式（Factory Pattern）

静态工厂不需要使用创建对象的方法来实例化对象，但不能通过继承来改变创建方法的行为。

