function countHeat() {
	var temp_pomech = document.querySelector('#temp_pomech').value.replace(',', '.');
	var temp_snarugi = document.querySelector('#temp_snarugi').value.replace(',', '.');
	var etaz = document.querySelector("#etaz").value;
	var visota_potolka = document.querySelector("#visota_potolka").value.replace(',', ".");
	var perekr_verh = document.querySelector('#perekr_verh').value;
	var perekr_niz = document.querySelector('#perekr_niz').value;
	var mater_stena = document.querySelector('#mater_stena').value;

	var stena1 = document.querySelector('#shirina1').value.replace(',', '.');
	var stena2 = document.querySelector('#shirina2').value.replace(',', '.');
	var stena3 = stena1;
	var stena4 = stena2;

	var shirina1 = stena1;
	var shirina2 = stena2;
	var shirina3 = stena3;
	var shirina4 = stena4;

	var kol_okon1 = document.querySelector('#kol_okon1').value.replace(',', '.');
	var tip_okno1 = document.querySelector('#tip_okno1').value;
	var visota_okna1 = document.querySelector('#visota_okna1').value.replace(',', '.');
	var shirina_okna1 = document.querySelector('#shirina_okna1').value.replace(',', '.');

	if (mater_stena == 0) {
		alert('Укажите материал стен');
		return;
	}

	if (stena1 == 0 || stena2 == 0 || stena3 == 0 || stena4 == 0) {
		alert('Укажите длину всех стен');
		return;
	}

	if (kol_okon1 != 0 && kol_okon1 != '') {
		if (visota_okna1 == 0 || shirina_okna1 == 0) {
			alert('Укажите размеры окна');
			return;
		}
		if (tip_okno1 == 0) {
			alert('Укажите тип окон');
			return;
		}
	} else {
		visota_okna1 = 0;
		shirina_okna1 = 0;
	}

	var s_okna = visota_okna1 * shirina_okna1 * kol_okon1;
	var s_sten = (stena1 * 1 + stena2 * 1 + stena3 * 1 + stena4 * 1) * etaz;
	var s_sten_nar = ((shirina1 * 1 + shirina2 * 1 + shirina3 * 1 + shirina4 * 1) * visota_potolka) * etaz;
	var s_sten_win = s_sten_nar - s_okna;
	var s_potolka = stena1 * stena2;
	var s_pola = stena1 * stena2;

	var T = temp_pomech - temp_snarugi;
	var Q_okna = tip_okno1 * s_okna / 1000;
	var Q_sten = T / mater_stena * s_sten_nar / 1000;
	var Q_potolka = s_potolka * perekr_verh / 1000;
	var Q_pola = s_pola * perekr_niz / 1000;
	var Q = Q_okna * 1 + Q_sten * 1 + Q_potolka * 1 + Q_pola * 1;
	var Q_kotla = Math.ceil(Q);

	var print_s_okna = '<tr><td>Площадь окон, кв. м.</td><td width="100">' + s_okna.toFixed(2) + '</td></tr>';
	var print_s_sten_nar = '<tr><td>Площадь стен, кв. м.</td><td>' + s_sten_nar.toFixed(2) + '</td></tr>';
	var print_s_sten_win = '<tr><td>Площадь стен без окон, кв. м.</td><td>' + s_sten_win.toFixed(2) + '</td></tr>';
	var print_s_potolka = '<tr><td>Площадь потолка, кв. м.</td><td>' + s_potolka.toFixed(2) + '</td></tr>';
	var print_s_pola = '<tr><td>Площадь пола, кв. м.</td><td>' + s_pola.toFixed(2) + '</td></tr>';
	var print_Q_okna = '<tr><td>Теплопотери окон, кВт</td><td>' + Q_okna.toFixed(2) + '</td></tr>';
	var print_Q_sten = '<tr><td>Теплопотери стен, кВт</td><td>' + Q_sten.toFixed(2) + '</td></tr>';
	var print_Q_potolka = '<tr><td>Теплопотери потолка(ов), кВт</td><td>' + Q_potolka.toFixed(2) + '</td></tr>';
	var print_Q_pola = '<tr><td>Теплопотери пола(ов), кВт</td><td>' + Q_pola.toFixed(2) + '</td></tr>';
	var print_Q = '<tr><td>Общие теплопотери помещения составляют, кВт</td><td>' + Q.toFixed(2) + '</td></tr>';
	var print_Q_kotla = '<tr><td style="font-size: 19px;">Ориентировочная мощность котла</td><td style="font-size: 19px;"><output class="_customer-heat__value">' + Q_kotla + '</output> кВт</td></tr>';
	var result = '<table cellpadding="0" cellspacing="0">' + print_s_okna + print_s_sten_nar + print_s_sten_win + print_s_potolka + print_s_pola + print_Q_okna + print_Q_sten + print_Q_potolka + print_Q_pola + print_Q + print_Q_kotla + '</table>';
	document.querySelector('.Q_kotla').innerHTML = Q_kotla;
	document.querySelector('.Q_kotla_input').value = Q_kotla;
	
	
	$('.calculator__fields.step-1').removeClass('active');
	$('.calculator__fields.step-2').addClass('active');
}

$('.to-step-3').on('click', function() {
	$('.calculator__fields.step-2').removeClass('active');
	$('.calculator__fields.step-3').addClass('active');
})