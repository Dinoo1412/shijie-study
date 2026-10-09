#include <iostream>
#include <string>
using namespace std;
// 友元函数
/*
 友元函数是一个普通的函数，但它被声明为某个类的友元，可以访问该类的私有成员和保护成员。

 可以让一个类或者函数能够访问另一个类的私有成员和保护成员。友元函数的声明使用关键字 friend，通常在类的内部进行声明。

三种友元关系：
1.全局函数作为类的友元函数
2.类的成员函数作为另一个类的友元函数
3.一个类作为另一个类的友元类
*/
class Person; //前向声明

class FriendPerson {
public:
    FriendPerson() {}
    void showPersonInfo(Person *p);    //要特别注意程序执行顺序是从上至下，如果直接使用函数。showPersonInfo会报错，因为此时Person类还未定义
    void showPersonAge(Person *p);
};

class Person {
    // friend class FriendPerson; //类的成员函数作为另一个类的友元函数
    friend void FriendPerson::showPersonAge(Person *p); //类的成员函数作为另一个类的友元函数
    friend void showAge(Person *p); //全局函数作为类的友元函数
public:
    Person():name("钟意"),age(18) {}
public:
    string name;
private:
    int age;
};


// 1.全局函数作为类的友元函数
void showAge(Person *p) {
    cout << "访问友元函数，年龄：" << p->age << endl;
}
// 2.类的成员函数作为另一个类的友元函数
void FriendPerson::showPersonAge(Person *p) {
    cout<<"年龄：" << p->age << endl;
}

// 3.一个类作为另一个类的友元类
// void FriendPerson::showPersonInfo(Person *p) {
//     cout << "访问友元类的成员函数，姓名：" << p->name << "，年龄：" << p->age << endl;
// }

int main (){
    Person p1;
    cout << "姓名：" << p1.name << endl;
    showAge(&p1);
    FriendPerson fp;
    fp.showPersonAge(&p1);
    // fp.showPersonInfo(&p1);
    // cout << "年龄：" << p1.age << endl; /如果不声明友元函数的话，错误，age是私有成员，不能直接访问

    return 0;
}  