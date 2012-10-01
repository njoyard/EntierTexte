/* Public domain */

EntierTexte = (function() {
	var data = {
		inf20: ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'],
		
		dizaines: ['/', '/', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', '/', 'quatre-vingt', '/']
	};

	// TODO gestion suffixe (pour 'cent(s)')
	var EntierTexte = function EntierTexte(num) {	
		if (num < 20) {
			return data.inf20[num];
		}
		
		else if (num < 100) {
			var dizaines = Math.floor(num / 10);
			
			// 7x = 60 + 1x, 9x = 80 + 1x
			// Pour écrire septante/octante/nonante, les ajouter dans le tableau 'dizaines' et supprimer ce if
			if (dizaines === 7 || dizaines === 9) {
				dizaines--;
			}
			
			var reste = num - 10 * dizaines;
			
			if (reste === 0) {
				return data.dizaines[dizaines];
			} else {
				if ((reste === 1 || reste === 11) && dizaines >= 2 && dizaines <= 6)
					return data.dizaines[dizaines] + '-et-' + EntierTexte(num - 10 * dizaines);
				else
					return data.dizaines[dizaines] + '-' + EntierTexte(num - 10 * dizaines);
			}
		}
		
		// Pour écrire par exemple 'treize cents' au lieu de 'mille trois cents', passer à 'num < 2000'
		else if (num < 1000) {
			var centaines = Math.floor(num / 100),
				reste = num - 100 * centaines,
				tCentaines = centaines == 1 ? '' : (data.inf20[centaines] + ' ');
			
			if (reste === 0)
				return tCentaines + (centaines > 1 ? 'cents' : 'cent');
			else
				return tCentaines + 'cent ' + EntierTexte(num - 100 * centaines);
		}
		
		else if (num < 1000000000) {
			var reste = num,
				rang = 0,
				texte = '';
			
			while (reste > 0) {
				var milliers = Math.floor(reste / 1000),
					inf999 = reste - 1000 * milliers;
				
				if (inf999 > 0) {
					if (rang === 0) {
						texte = EntierTexte(inf999);
					}
					
					else if (rang === 1) {
						if (inf999 === 1)
							texte = 'mille ' + texte.trim();
						else
							texte = EntierTexte(inf999) + ' mille ' + texte.trim();
					}
					
					else if (rang === 2) {
						texte = EntierTexte(inf999) + (inf999 > 1 ? ' millions ' : ' million ') + texte.trim();
					}
				}
				
				reste = milliers;
				rang++;
			}
			
			return texte;
		}
		
		else {
			var milliards = Math.floor(num / 1000000000),
				reste = num - 1000000000 * milliards;
			
			if (reste === 0)
				return EntierTexte(milliards) + (milliards > 1 ? ' milliards' : ' milliard');
			else
				return EntierTexte(milliards) + (milliards > 1 ? ' milliards ' : ' milliard ') + EntierTexte(reste);
		}
	};
	
	return EntierTexte;
})();