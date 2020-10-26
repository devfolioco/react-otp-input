#include <stdio.h>
int main()
{
    char ch;
    printf("Enter any character:");

    /* Reads the entered character and stores it
     * into the char variable ch
     */
    scanf("%c", &ch);

    /* Using the format specifiers we can get the ASCII code
     * of a character. When we use %d format specifier for a
     * char variable then it displays the ASCII value of a char
     */
    printf("ASCII value of character %c is: %d", ch, ch);
    return 0;
}
