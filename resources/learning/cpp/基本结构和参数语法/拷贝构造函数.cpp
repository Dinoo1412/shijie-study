#include <iostream>
#include <string>
using namespace std;

class Hero {
public:
    // 默认构造函数
    Hero()
    {
        id=0;
        cout << "Hero 默认构造函数被调用" << endl;
    }
    //参数构造函数
    Hero(int i)
    {
        id = i;
        cout << "Hero 参数构造函数被调用，id=" << id << endl;
    }
    //拷贝构造函数   用一个新对象去初始化另一个同类型的已存在对象   引用传递：直接传参防止再一次拷贝   const是为了防止修改被拷贝对象
    Hero(const Hero &h)
    {
        id = h.id;
        cout << "Hero 拷贝构造函数被调用，id=" << id << endl;
    }
    // 析构函数
    ~Hero()
    {
        cout << "Hero 析构函数被调用" << endl;
    }

private:
    int id;
};


// void func()
// {
//     Hero h; //局部对象，函数结束后会自动调用析构函数
// }


/*
拷贝构造函数的调用时机：
1. 用一个已经存在的对象来初始化一个新对象
2. 函数的传参：值传递的方式给函数参数传值
3. 函数的返回值：以值的方式返回局部对象
*/

//1.用一个已经存在的对象来初始化一个新对象
void func1() //值传递，调用拷贝构造函数
{
    cout << "func1 函数被调用" << endl;
    Hero h1(20); //默认构造函数
    Hero h2(h1); //拷贝构造函数
}


//2.函数的传参：值传递的方式给函数参数传值
void testFunc1(Hero h) 
{
    cout << "testFunc1 函数被调用" << endl;
}
void testFunc2(Hero *h) 
{
    cout << "testFunc2 函数被调用" << endl;
}

Hero testFunc3() 
{
    cout << "testFunc3 函数被调用" << endl;
    Hero h; //默认构造函数
    return h; //值返回，调用拷贝构造函数
}


void func2() //函数传参，调用拷贝构造函数
{
    cout << "func2 函数被调用" << endl;
    Hero h1; //默认构造函数
    // testFunc1(h1); //值传递，调用拷贝构造函数
    testFunc2(&h1); //地址传递，不会调用拷贝构造函数  因为拷贝调用函数时需要生成新的对象，而在这里没有生成新对象，只是地址传递进去了而已
}


//3.函数的返回值：以值的方式返回局部对象
void func3() //值返回，调用拷贝构造函数
{
    cout << "func3 函数被调用" << endl;
    Hero h1 = testFunc3(); //值返回，调用拷贝构造函数
}



int main()
{
    // func(); //调用函数，创建局部对象
    // Hero h2; //主函数中的对象，程序结束后会自动调用析构函数
    // int a;
    // cin >> a; //等待输入，防止程序立即结束
    // Hero h3(10); //调用参数构造函数
    // Hero h4 = h3; //调用拷贝构造函数
    func1(); //调用函数，值传递，调用拷贝构造函数
    func2(); //调用函数，函数传参，调用拷贝构造函数
    func3(); //调用函数，值返回，调用拷贝构造函数    理论上应该调用，但是实际上编译器做了优化，没有调用拷贝构造函数，称为为返回值优化（RVO，Return Value Optimization）
             //可以强制关闭ROV来验证拷贝构造函数的调用情况，不同编译器关闭RVO的方法不同
             

    return 0;
}

/*
func1 函数被调用
Hero 参数构造函数被调用，id=20
Hero 拷贝构造函数被调用，id=20
Hero 析构函数被调用
Hero 析构函数被调用
func2 函数被调用
Hero 默认构造函数被调用
testFunc2 函数被调用
Hero 析构函数被调用
func3 函数被调用
testFunc3 函数被调用
Hero 默认构造函数被调用
Hero 析构函数被调用

*/