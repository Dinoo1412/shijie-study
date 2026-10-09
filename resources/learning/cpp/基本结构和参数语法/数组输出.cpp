#include <iostream>
using namespace std;
int main(){
    int j=4;
    int a[1024]={1,2,3,4,5};
    for(int i=0;i<=j;){
        cout << a[i] <<endl;
        i++;
    }
    cout << "======" << endl;

    for(int i=0;i<=j;){
        cout << a[i] <<endl;
        ++i;
    }

    return 0;
}