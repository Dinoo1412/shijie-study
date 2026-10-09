#include <iostream>
#include <string>

using namespace std;

struct Book
{

    string name;
    double price;
    int value;
}book;



int main(){
    Book a={"c语言",99.9,7};
    book={"C++语言",99.9,7};
    Book *bp=&a;
    bp->name="python"; //指针指向属性 应该使用->



    cout << a.name << endl;
    cout << book.name << endl;



    return 0;

}