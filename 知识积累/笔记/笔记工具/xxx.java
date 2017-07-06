public class Singleton {
	//volatile关键词确保：当uniqueInstance变量被初始化成Singleton实例时，多个线程正确地处理uniqueInstance变量
	private volatile static Singleton uniqueInstance;

	private Singleton(){}

	public static Singleton getInstance(){
		//检查实例，如果不存在，就进入同步区块
		if(uniqueInstance == null){
			synchronized(Singleton.class){
				//进入区块后，再检查一次。如果仍是null，才创建实例
				if(uniqueInstance == null){
					uniqueInstance = new Singleton();
				}
			}
		}
		return uniqueInstance;
	}
}
