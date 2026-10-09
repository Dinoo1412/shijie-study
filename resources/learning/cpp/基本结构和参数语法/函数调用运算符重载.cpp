#include <iostream>
#include <string>
using namespace std;
// 为什么要进行函数调用运算符重载？
// 因为函数的调用是即时存储即使释放，但是重载之后可以记录下函数的状态值
class AddFunct{
public:
    AddFunct(){
        m_acc=0;
    }
    int operator() (int a,int b){
        m_acc++;
        return a+b+m_acc;
    }
private: 
    int m_acc;

};

int Add(int a,int b){
    return a+b;
}


int main(){
    cout << Add(1,2) <<endl;
    cout << Add(1,2) <<endl;   
    cout << Add(1,2) <<endl;
    cout << Add(1,2) <<endl;
    AddFunct add;
    cout << "-------伪函数调用--------" << endl;
    cout << add(1,2) <<endl;  //伪函数
    cout << add(1,2) <<endl;   
    cout << add(1,2) <<endl;
    cout << add(1,2) <<endl;

    return 0;
}