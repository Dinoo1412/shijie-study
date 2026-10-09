#include <iostream>
#include <string>
using namespace std;
// 列表初始化
// 列表初始化语法 构造函数(传参1，传参2): 成员变量1(传参1)，成员变量2(传参2){};

class Hero {
public:
    //参数构造函数
    // Hero(string name,int hp)
    // {
    //     N_name = name;
    //     H_hp = hp;
    // }

    Hero(string name,int hp):N_name(name),H_hp(1000000)
    {
    }
    void showInfo(){
        cout << "英雄名称：" << N_name << "  生命值：" << H_hp << endl;
    }
private:
    string N_name;
    int H_hp;
};


int main (){
    Hero h1{"钟意",600}; //列表初始化
    h1.showInfo();  
    return 0;
}
/*  初始化结果：
    Hero(string name,int hp):N_name("钟意"),H_hp(1000000)
    {
    }
    void showInfo(){
        cout << "英雄名称：" << N_name << "  生命值：" << H_hp << endl;
    }
英雄名称：钟意  生命值：1000000
*/