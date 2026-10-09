#include <iostream>
using namespace std;

//结构体参数传递，其实和值和地址的传递一样，只要参透指针的意义就可以
struct point{
    double x,y;
};
struct circle{
    point pt;
    int radius;
};

void printCircle(circle c){
    cout << "圆的圆心是" <<c.pt.x <<c.pt.y << "    " << "圆的半径是" << c.radius << endl;
}

void moveCircle(circle c,int x, int y){
    c.pt.x +=x;
    c.pt.y +=y;
}

void moveCircle1(circle *c,int x, int y){
    c->pt.x +=x;
    c->pt.y +=y;
}

int main(){
    circle a ={{9,8},5};
    circle b ={{9,8},5};
    moveCircle(a,1,-2);
    moveCircle1(&b,1,-2);
    printCircle(a);
    printCircle(b);

    return 0;
}