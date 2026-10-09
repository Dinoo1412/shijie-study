/*
Problem Description
统计给定的n个数中，负数、零和正数的个数。
 
Input
输入数据有多组，每组占一行，每行的第一个数是整数n（n<100），表示需要统计的数值的个数，然后是n个实数；如果n=0，则表示输入结束，该行不做处理。
 
Output
对于每组输入数据，输出一行a,b和c，分别表示给定的数据中负数、零和正数的个数。
 
*/
#include <iostream>
using namespace std;

struct SequentialList{
    double* elements;
    int size;
    int capacity;
};

void initialize(SequentialList *list,int capacity){
    list->elements =new double[capacity];
    list->size =0;
    list->capacity = capacity;
}

void insertElement(SequentialList *list,int index, double element){
    if(index<0 || index>list->size){
        throw std::invalid_argument("Invalid index");
    }
    if(list->size == list->capacity){
        int newCapacity = list->capacity * 2;
        double* newElements = new double[newCapacity];
        for(int i=0;i<list->size;i++){
            newElements[i]=list->elements[i];
        }
    }
    for(int i= list->size;i>index;--i){
        list->elements[i]=list->elements[i-1];
    }
    list->elements[index]=element;
    list->size++;

}

double getElement(SequentialList *list,int index){
    if(index<0 || index>=list->size){
        throw std::invalid_argument("Invalid index");
    }
    return list->elements[index];
}

int main(){
    int n;
    while(cin >> n){
        if(n==0){
            break;
        }
        SequentialList list;
        initialize(&list,n);
        for(int i= 0 ;i <n;i++){
            double num;
            cin >> num;
            insertElement(&list,i,num);
        }
        int inegativeCount=0;
        int izeroCount=0;
        int ipostiveCount=0;
        for(int i=0;i<list.size;i++){
            double val = getElement(&list,i);
            if(val < 0){
                inegativeCount++;
            }else if(val == 0){
                izeroCount++;
            }else{
                ipostiveCount++;
            }
        }
        cout << inegativeCount << " " << izeroCount << " " << ipostiveCount << endl;
    }
    return 0;
}