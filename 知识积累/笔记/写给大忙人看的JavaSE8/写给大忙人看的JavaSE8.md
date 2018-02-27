# 写给大忙人看的Java SE 8    
## 第1章 lambda表达式
### 1.2 lambda表达式的语法    
- lambda表达式的格式：参数、箭头->，以及一个表达式。
    
- 如负责计算的代码无法用一个表达式表示，则可使用{}包裹代码并明确使用return语句，例如：
```
(String first, String second) -> {
	if (first.length() < second.length()) return -1;
	else if (first.length() > second.length()) return 1;
	else return 0;
}
```
    
- 如没有参数时，则可用一对空的小括号表示，
```
() -> {for (int i = 0; i < 1000; i++) doWork(); }
```
    
- 如参数类型时可以被推导的，则可以省略参数的类型，
```
Comparator<String> comp = 
	= (first, second)	//同(String first, String second)一样    
		-> Integer.compare(first.length(), second.length());
```
    
- 如只包含一个参数且该参数可以被推导出来，则可省略小括号，
```
EventHandler<ActionEvent> listner = event -> System.out.println("Thanks for clicking!");
//无须(event) ->或 (ActionEvent event) ->
```   
        
> 注意：lambda表达式的参数可添加注解或final修饰符，如
(final String name) -> ...
(@NotNull String name) -> ...    
    
- 永远不需要为一个lambda表达式执行返回类型，它总是会从上下文中被推导出来，
```
(String first, String second) -> Integer.compare(first.length(), second.length())    //期望的结果类型为int
```
        
> 注意：在lambda表达式中，只在某些分之中返回值（其他分支没有返回值）是不合法的，例如，
```
(int x) -> {if (x >= 0) return 1; }
```
    
### 1.3 函数式接口
**定义：对于只包含一个抽象方法的接口，你可以通过lambda表达式来创建该接口的对象。**    
> 注意：为什么函数式接口必须只有一个抽象方法，难道接口中的方法不都是抽象的吗？
> 接口中经常会重新声明Object类中的方法，例如toString或者clone，而这些方法声明并不是抽象的。（Java API中的某些接口重新声明Object类的方法，是为了关联javadoc的注释。具体例子可以参考Comparator API。）
> 在Java8中接口可以声明非抽象的方法。
    
- 最好将一个lambda表达式想象成一个函数，而不是一个对象，并记住它可以被转换为一个函数式接口。    

> 注意：不能将一个lambda表达式赋值给一个Object类型的变量，因为Object不是一个函数式接口。    

【理解】只有在函数式接口中，才可以使用lambda表达式。

- 可将lambda表达式保存在函数式接口的变量中。
```
 BiFunction<String, String, Integer> comp = (first, second) -> Integer.compare(first.length(), second.length());
```    
但是不可将BiFunction作为Arrays.sort方法的参数。    

- 任何lambda表达式都可以等价转换成现在所使用的API中对应的函数式接口。
> 注意：可在任意函数式接口上标注@FunctionalInterface注解，这样做的好处，    
> 1.编译器会检查标注该注解的实体，检查它是否是只包含一个抽象方法的接口。
> 2.javadoc页面会包含一条声明，说明这个接口是一个函数式接口。
> 该注解并不要求强制使用。从概念上来讲，所有只含有一个抽象方法的接口都是函数式接口，但是使用@FunctionalInterface注解会让你的代码看上去更清楚。

- 当一个lambda表达式被转换为一个函数式接口的实例时，如果该表达式可能会抛出检查期异常，有两种方法修正该问题。
1.在目标接口的抽象方法中进行声明；
2.在无法修改接口时，可在lambda表达式中捕获异常。

### 1.4 方法引用


