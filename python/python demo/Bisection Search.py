x = float(raw_input("Enter one number: "))
epsilon = 0.01
num = 0       #the number of cycle
low = 0
high = x
ans = (low+high)/2.0

while abs(ans**2 - x) >= epsilon:
    print('low = ' + str(low) + ' high = '+str(high) + ' ans = '+str(ans))
    num += 1
    if ans**2 > x:
        high = ans
    else:
        low = ans
    ans = (low+high)/2.0
print('numGuess = {0}'.format(str(num)))
print(str(ans)+' is close to square root of ' + str(x))
