export const CODE_PRESET = {
  C: `#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}`,
  JAVA: `public class Main
{ 
    public static void main(String args[])
    { 
        System.out.println("Hello, World!"); 
    } 
}`,
  Javascript: `console.log('Hello, World!');`,
  Typescript: `console.log('Hello, World!');`,
  Python: `print('Hello, World!')`,
};
