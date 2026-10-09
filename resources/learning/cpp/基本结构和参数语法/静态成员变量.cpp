#include <iostream>
#include <string>
using namespace std;


// 静态成员变量
// 静态成员变量：属于类本身，而不属于类的某个对象。所有该类的对象共享同一个静态成员变量。
// 静态成员变量在类外进行定义和初始化。

/*
静态成员的特点
1. 静态成员变量属于类本身，而不属于类的某个对象。所有该类的对象共享同一个静态成员变量，共享一份数据。
2. 编译阶段分配内存。
3. 静态成员函数只能访问静 态成员变量，不能访问非静态成员变量。
4. 需要在类内进行声明，在类外进行初始化。
*/

class Hero {
public:
    Hero(string name,int hp):N_name(name),H_hp(hp)  //成员初始化列表
    {
        //每创建一个对象，英雄数量+1
        HeroCount++;  
    }
    void showInfo(){
        cout << "英雄名称：" << N_name << "  生命值：" << H_hp << endl;
    }
    // 静态成员函数，获取英雄数量
    static int getHeroCount(){
        return HeroCount;
    }
private:
    string N_name;
    int H_hp;
    // 静态成员变量，记录英雄数量
    static int HeroCount;
};
int Hero::HeroCount = 0; //初始化静态成员变量  不能放在类的前面
int main (){
    Hero h1{"钟意",600}; //列表初始化
    h1.showInfo();
    cout << "当前英雄数量：" << Hero::getHeroCount << endl; //通过类名访问静态成员函数
    cout << "当前英雄数量：" << h1.getHeroCount() << endl; //通过对象访问静态成员函数
    //两个变量是同一个变量
    return 0;
}
