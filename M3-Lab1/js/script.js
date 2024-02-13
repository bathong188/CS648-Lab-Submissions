// Practice with Arrays

// P1
console.log("P1");
let favMovies = ["Violet Evergarden", "Top Gun: Maverick", "The Grand Budapest Hotel", "Ninja Scroll", "Howl's Moving Castle"];
console.log(favMovies[1]);

// P2
console.log("P2");
let movies = new Array(5);
for (let i = 0; i < movies.length; i++) {
    movies[i] = favMovies[i];
}
console.log(movies[0]);

// P3: Add a new movie into the 3rd position within your array
console.log("P3");
movies.splice(2, 0, "The Wind Rises");
console.log(movies.length);

// P4
console.log("P4");
movies = ["Violet Evergarden", "Top Gun: Maverick", "The Grand Budapest Hotel", "Ninja Scroll", "Howl's Moving Castle"];
delete movies[0];
console.log(movies);
console.log("\n");

// P5
console.log("P5");
movies = ["Violet Evergarden", "Top Gun: Maverick", "The Grand Budapest Hotel", "Ninja Scroll", "Howl's Moving Castle",
    "The Wind Rises", "Interstellar"];
for (let i in movies) {
    console.log(movies[i]);
}
console.log("\n");

// P6
console.log("P6");
for (let movie of movies) {
    console.log(movie);
}
console.log("\n");

// P7
console.log("P7");
movies.sort();
for (let movie of movies) {
    console.log(movie);
}
console.log("\n");

// P8
console.log("P8");
let leastFavMovies = ["White Chicks", "The Lighthouse", "John Wick: Chapter 4"];
console.log("Movies I like:");
console.log("\n");
for (let movie of movies) {
    console.log(movie);
}
console.log("\n");
console.log("Movies I regret watching:");
console.log("\n");
for (let movie of leastFavMovies) {
        console.log(movie);
}
console.log("\n");

// P9
console.log("P9");
movies = movies.concat(leastFavMovies);
movies.sort().reverse();
console.log(movies);

// P10
console.log("P10");
console.log(movies.pop());

// P11
console.log("P11");
console.log(movies.shift());

// P12: Programmatically retrieve the movies in your array that you do not like and return their indices. Then, using
// those indices, programmatically add movies that you do like.
console.log("P12");
let leastFavIndices = [];
leastFavMovies.forEach(movie => {
    let index = movies.indexOf(movie);
    if (index !== -1) {
        leastFavIndices.push(index);
    }
});
console.log(movies);
console.log("Least fav movies indices: " + leastFavIndices);

let moreFavMovies = ["Spirited Away", "Puss in Boots: The Last Wish"];
for (let i = 0; i < leastFavIndices.length; i++) {
    console.log(moreFavMovies[i]);
    movies[leastFavIndices[i]] = moreFavMovies[i];
}
console.log(movies);

// P13
console.log("P13");
movies = [["Top Gun: Maverick", 1], ["Interstellar", 2], ["The Wind Rises", 3], ["Puss in Boots: The Last Wish", 4],
    ["Violet Evergarden", 5]];
// filter: checks if the first element of each sub-array (movie) is of type string
// map: used to transform each sub-array to only include the first element (the movie name) in a new array
let filteredNames = movies.filter(movie => typeof movie[0] === "string").map(movie => movie[0]);
console.log(filteredNames);

// P14
console.log("P14");
let employees = ["ZAK", "JESSICA", "MARK", "FRED", "SALLY"];
let showEmployees = employeeArray => {
    console.log("Employees:");
    employeeArray.forEach(employee => {
        console.log(employee);
    });
};

showEmployees(employees);

// P15
console.log("P15");
let filterValues = arrayToFilter => {
    return arrayToFilter.filter(value => {
        // if not falsy values (false, 0, an empty string. null, undefined, NaN)
        if (value) {
            return value;
        }
    });
};

console.log(filterValues([58, '', 'abcd', true, null, false, 0]));

// P16
console.log("P16");
let getRandomIndex = array => {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
};
console.log(getRandomIndex([1,2,3,4,5,6,7,8,9,10]))

// P17
console.log("P17");
let getLargestNumber = array => {
    // Sort numeric array
    array.sort((a, b) => {
        return a - b;
    });
    console.log(array);
    return array[array.length - 1];
};
console.log(getLargestNumber([33 , 61, 24, 556, 632, 65, 89, 32]));
