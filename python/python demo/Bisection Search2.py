print('Please think of a number between 0 and 100!')
x = 54

low = 0
high = 100
guessed = False

while not guessed:
    guess = (low + high)/2
    print('Is your secret number ' + str(guess)+'?')
    s = raw_input("Enter 'h' to indicate the guess is too high.\
                  Enter 'l' to indicate the guess is too low. Enter \
                    'c' to indicate I guessed correctly.")
    if s == 'c':
        guessed = True
    elif s == 'l':
        low = guess
    elif s == 'h':
        high = guess
    else :
        print('Sorry, I did not understand your input.')
print('Game over. Your secret number was: '+str(guess))
