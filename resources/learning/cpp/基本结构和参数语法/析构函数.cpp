#include <iostream>
#include <string>
using namespace std;


/*
析构函数：在对象销毁时自动调用，用于释放对象占用的资源
析构函数的特点：
1. 析构函数的名称必须与类名相同，但在前面加上一个波浪号（~）
2. 析构函数没有返回值类型，甚至没有void
3. 析构函数不能有参数，也不能重载
4. 析构函数在对象生命周期结束时自动调用，比如局部对象在函数结束时调用，动态分配的对象在delete时调用
*/

class Hero {
public:
    //构造函数
    Hero()
    {
        cout << "Hero 构造函数被调用" << endl;
    }
    //析构函数
    ~Hero()
    {
        cout << "Hero 析构函数被调用" << endl;
    }

};
void func()
{
    Hero h; //局部对象，函数结束后会自动调用析构函数
}

int main()
{
    func(); //调用函数，创建局部对象
    Hero h2; //主函数中的对象，程序结束后会自动调用析构函数
    int a;
    cin >> a; //等待输入，防止程序立即结束


    return 0;
}
/*
Hero 构造函数被调用
Hero 析构函数被调用
Hero 构造函数被调用
a
Hero 析构函数被调用
*/