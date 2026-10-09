#include <iostream>
#include <vector>
using namespace std;

void printVector(const vector<int>& vec) { // 加入引用保证不二次复制
    for (size_t i = 0; i < vec.size(); ++i) {
        cout << vec[i] << " ";
    }
    cout << endl;
}

int main() {
    vector<int> vec;
    vec.push_back(10); 
    vec.push_back(20); 
    vec.push_back(30); // 在末尾添加元素30

    printVector(vec); 

    vec.pop_back(); // 删除末尾元素
    printVector(vec); 

    vec.insert(vec.begin() + 1, 15); // 在索引1位置插入元素15
    printVector(vec);                                       

    vec.erase(vec.begin()); // 删除索引0位置的元素
    printVector(vec); 

    cout << "Vector size: " << vec.size() << endl;
    cout << "Vector capacity: " << vec.capacity() << endl; 

    return 0;
}