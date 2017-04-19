# 《Head First设计模式》笔记

Eirc Freeman & Elisabeth Freeman with Kathy Sierra & Bert Bates著  
中国电力出版社

书评： 写书的范例，写得特别好

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

**在设计模式中，所谓的“实现一个接口”并“不一定”表示“写一个类，并利用implements关键词来实现某个Java接口”。“实现一个接口”泛指实现某个超类型（可以是类或接口）的某个方法。**

书中例子关键词：披萨店、相同的制作流程、不同地域的披萨店、创建不同口味的披萨（工厂）

    public abstract class PizzaStore {
    	public Pizza orderPizza(String type){
    		Pizza pizza;
    		pizza = createPizza(type);
    		pizza.prepare();
    		pizza.bake();
    		pizza.cut();
    		pizza.box();
    		return pizza;
    	}
    	abstract Pizza createPizza(String type);
    }
    
    public class NYPizzaStore extends PizzaStore{
    	Pizza createPizza(String item){
    		if(item.equals("cheese")){
    			return new NYStyleCheesePizza();
    		} else if(item.equals("veggie")){
    			return new NYStyleVeggiePizza();
    		} else if(item.equals("clam")){
    			return new NYStyleClamPizza();
    		} else if(item.equals("pepperoni")){
    			return new NYStylePepperoniPizza();
    		} else {
    			return null;
    		}
    	}
    }
    
    public abstract class Pizza {
    	String name;
    	String dough;
    	String sauce;
    	ArrayList toppings = new ArrayList();
    
    	void prepare(){
    		System.out.println("Preparing " + name);
    		System.out.println("Tossing dough...");
    		System.out.println("Adding sauce...");
    		System.out.println("Adding toppings: ");
    		for(int i = 0; i < toppings.size(); i++){
    			System.out.println("   " + toppings.get(i));
    		}
    	}
    
    	void bake(){
    		System.out.println("Bake for 25 minutes at 350");
    	}
    
    	void cut(){
    		System.out.println("Cutting the pizza into diagonal slices");
    	}
    
    	void box(){
    		System.out.println("Place pizza in official PizzaStore box");
    	}
    
    	public String getName(){
    		return name;
    	}
    }
    
    public class NYStyleCheesePizza extends Pizza {
    	public NYStyleCheesePizza(){
    		name = "NY Style Sauce and Cheese Pizza";
    		dough = "Thin Crust Dough";
    		sauce = "Marinara Sauce";
    
    		toppings.add("Grated Reggiano Cheese");
    	}
    }
    
    public class ChicagoStyleCheesePizza extends Pizza {
    	public ChicagoStyleCheesePizza(){
    		name = "Chicago Style Deep Dish Cheese Pizza";
    		dough = "Extra Thick Crust Dough";
    		sauce = "Plum Tomato Sauce";
    
    		toppings.add("Shredded Mozzarella Cheese");
    	}
    
    	void cut(){
    		System.out.println("Cutting the pizza into square slices");
    	}
    }
    
    public class PizzaTestDrive{
    	public static void main(String[] args){
    		PizzaStore nyStore = new NYPizzaStore();
    		PizzaStore chicagoStore = new ChicagoPizzaStore();
    
    		Pizza pizza = nyStore.orderPizza("cheese");
    		System.out.println("Ethan orderd a " + pizza.getName() + "\n");
    
    		pizza = chicagoStore.orderPizza("cheese");
    		System.out.println("Joel orderd a " + pizza.getName() + "\n");
    	}
    }

> **工厂方法模式**定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类。

工厂方法不一定是抽象的，可以定义一个默认的工厂方法来产生某些具体的产品，这么一来，即使创建者没有任何子类，依然可以创建产品。

工厂方法带参数时，被称为“参数化工厂方法”。

如何限制传入工厂方法的参数，可通过创建代表参数类型的对象和使用静态常量或者Java5所支持的enum。


依赖倒置原则（Dependency Inversion Principle）
**设计原则**（Page 139）
> 要依赖抽象，不用依赖具体类。

**不能让高层组件依赖低层组件，而且，不管高层或者低层组件，“两者”都应该依赖于抽象。**

PizzaStore

Pizza

NYStyleCheesePizza、NYStylePepperoniPizza、……


依赖倒置：低层组件依赖高层的抽象。高层组件也依赖相同的抽象。

如何避免在OO设计中违反依赖倒置原则：  
  
- **变量不可以持有具体类的引用。**如果使用new，就会持有具体类的引用。你可以改用工厂来避开这样的做法。  
- **不要让类派生自具体类。**如果派生自具体类，你就会依赖具体类。请派生自一个抽象（接口或抽象类）  
- **不要覆盖基类中已实现的方法。**如果覆盖基类已实现的方法，那么你的基类就不是一个真正适合被基础的抽象。基类中已实现的方法，应该由所有的子类共享。

应尽量遵守上述原则。


**确保原料的一致**

    public interface PizzaIngredientFactory{
    	public Dough createDough();
    	public Sauce createSauce();
    	public Cheese createCheese();
    	public Veggies[] createVeggies();
    	public Pepperoni createPepperoni();
    	public Clams createClam();
    }
    
    public class NYPizzaIngredientFactory implements PizzaIngredientFactory{
    	public Dough createDough(){
    		return new ThinCrustDough();
    	}
    
    	public Sauce createSauce(){
    		return new MarinaraSauce();
    	}
    
    	public Cheese createCheese(){
    		return new ReggianoCheese();
    	}
    
    	public Veggeis[] createVeggeis(){
    		Veggies veggeis[] = {new Garlic(), new Onion(), new Mushroom(), new RedPepper()};
    		return veggies;
    	}
    
    	public Pepperoni createPepperoni(){
    		return new SlicedPeppernoi();
    	}
    
    	public Clams createClam(){
    		return new FreshClams();
    	}
    }
    
    public abstract class Pizza{
    	String name;
    	Dough dough;
    	Sauce sauce;
    	Veggies veggeis[];
    	Cheese cheese;
    	Pepperoni pepperoni;
    	Clams clam;
    
    	abstract void prepare();
    
    	void bake(){
    		System.out.println("Bake for 25 minutes at 350");
    	}
    
    	void cut(){
    		System.out.println("Cutting the pizza into diagonal slices");
    	}
    
    	void setName(String name){
    		this.name = name;
    	}
    
    	String getName(){
    		return name;
    	}
    
    	public String toString(){
    		//这里是打印披萨的代码
    	}
    }
    
    public class CheesePizza extend Pizza{
    	PizzaIngredientFactory ingredientFactory;
    
    	public CheesePizza(PizzaIngreientFactory ingredientFactory){
    		this.ingredientFactory = ingredientFactory;
    	}
    
    	void prepare(){
    		System.out.println("Preparing " + name);
    		dough = ingredientFactory.createDough();
    		sauce = ingredientFactory.createSauce();
    		cheese = ingredientFactory.createCheese();
    	}
    }
    
    public class ClamPizza extends Pizza{
    	PizzaIngredientFactory ingredientFactory;
    
    	public ClamPizza(PizzaIngredientFactory ingredientFactory){
    		this.ingredientFactory = ingredientFactory;
    	}
    
    	void prepare(){
    		System.out.println("Preparing " + name);
    		dough = ingredientFactory.createDough();
    		sauce = ingredientFactory.createSauce();
    		cheese = ingredientFactory.createCheese();
    		clam = ingredientFactory.createClam();
    	}
    }
    
    public class NYPizzaStore extends PizzaStore{
    	protected Pizza createPizza(String item){
    		Pizza pizza = null;
    		PizzaIngredientFactory ingredientFactory = new NYPizzaIngredientFactory();
    
    		if(item.equals("cheese")){
    			pizza = new CheesePizza(ingredientFactory);
    			pizza.setNmae("Ney York Style Cheese Pizza");
    		} else if(item.equals("veggie")){
    			pizza = new VeggiePizza(ingredientFactory);
    			pizza.setName("New York Style Veggie Pizza");
    		} else if(item.equals("clam")){
    			pizza = new ClamPizza(ingredientFactory);
    			pizza.setName("New York Style Clam Pizza");
    		} else if(item.equals("pepperoni")){
    			pizza = new PepperoniPizza(ingredientFactory);
    			pizza.setName("New York Style Pepperoni Pizza");
    		}
    	}
    }

## 5、抽象工厂模式
> **抽象工厂模式**提供一个接口，用于创建相关或依赖对象的**家族**，而不需要明确指定具体类。

抽象工厂的任务是定义一个负责创建一组产品的接口。这个接口内的每个方法都负责创建一个具体产品，同时我们利用实现抽象工厂的子类来提供这些具体的做法。 

**工厂模式与抽象工厂模式的区别**
待梳理...

## 6、单例模式（Singleton Pattern）
应用场景：线程池（threadpool）、缓存（cache）、对话框、处理偏好设置和注册表（registry）的对象、日志对象，充当打印机、显卡等设备的驱动程序的对象。

构造器私有
静态方法获取实例

书签： 已看完Page173

2017-04-19 Page169-Page173
