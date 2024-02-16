// Fonction utilisée
function square(largeur, hauteur) {
    
    if (largeur === 1) {
        console.log('o');
        
        for (let i = 1; i < hauteur - 1; i++) {
            console.log('|');
        }

        if (hauteur > 1) {
            console.log('o');
        }
    } else {
        const ligneLargeur = 'o' + '-'.repeat(largeur - 2) + 'o';
        console.log(ligneLargeur);

        for (let i = 0; i < hauteur - 2; i++) {
            const ligneHauteur = '|' + ' '.repeat(largeur - 2) + '|';
            console.log(ligneHauteur);
        }

        if (hauteur > 1) {
            console.log(ligneLargeur);
        }
    }
}

// Parsing
function getArguments() {
    let firstArgument = process.argv[2];
    let secondArgument = process.argv[3];

    firstArgument = parseInt(firstArgument);
    secondArgument = parseInt(secondArgument);

    return [firstArgument, secondArgument];
}

// Résolution
function resolution(){
    let arguments = getArguments();
    square(arguments[0], arguments[1]);
    return arguments;
}


// Affichage
resolution();

