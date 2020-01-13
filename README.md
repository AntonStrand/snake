# snake
CLI Snake in a functional style.

### Instructions
Try to eat as many apples as possible without dying.
You die by either colliding with the walls or yourself.

#### Controls
`wasd` `hjkl` or the arrow keys.

## How to use
### Install
```bash
npm install -g play-snake
```

### Play
Run `snake` followed by arguments.

1. Size (min: 3) [Integer]

It will create a square board with the provided dimensions.
```bash
snake <size>
```
or : 
1. Width (min: 3) [Integer]  
2. Height (min: 3) [Integer]  

It will create a board with the provided dimensions.
```bash
snake <width> <height>
``` 

#### Options
 `-b` Play a black and white version of the game  
 `-h` Help  
 `-i` Game instruction
