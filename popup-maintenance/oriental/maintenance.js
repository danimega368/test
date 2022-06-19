jQuery(document).ready(function () {
    if(window.location.href.indexOf("/bonus/") > -1)
	{
		var content1 = document.getElementById("primary").innerHTML; 
                var mindepobonus = content1 .replace(/Rp. 100.000,-/g, 'Rp. 50.000,-');
                document.getElementById("primary").innerHTML = mindepobonus ;	
                
                var content2 = document.getElementById("primary").innerHTML; 
                var mindepo2 = content2 .replace('100.000 jadi 105.000', '50.000 jadi 52.500');
                document.getElementById("primary").innerHTML = mindepo2;	
                
                var content3 = document.getElementById("primary").innerHTML; 
                var mindepo3 = content3 .replace('3Ã—105.000', '3Ã—52.500');
                document.getElementById("primary").innerHTML = mindepo3;	
                
                var content4 = document.getElementById("primary").innerHTML; 
                var mindepo4 = content4 .replace('315.000', '157.500');
                document.getElementById("primary").innerHTML = mindepo4;	
                
	};
	
     if(window.location.href.indexOf("/peraturan/") > -1)
	{
		jQuery('.entry-content').html('');
		jQuery('.entry-content').html('<div class="entry-content"><ol><li>Member yang sudah melakukan pendaftaran berarti setuju dengan ketentuan yang telah ditetapkan pihak Oriental303&trade;</li><li>Minimum usia 18 tahun untuk mendaftar di Oriental303&trade;</li><li>Setiap member harap bertanggung-jawab menyimpan User ID dan Password</li><li>Setiap ada perubahan data seperti nomor rekening dan nomor telepon, mohon di informasikan kepada pihak Oriental303&trade;</li><li>Minimum Deposit di Oriental303&trade; adalah Rp. 50.000,-</li><li>Minimum Withdrawal di Oriental303&trade; adalah Rp. 50.000,-</li><li>Setiap melakukan deposit, withdraw dan transfer dana ke User ID pada permainan lain harus dari rekening bank yang sama.</li><li>Minimum transfer dana / pindah kredit adalah Rp. 50.000,-</li><li>Jika member melakukan deposit melalui rekening bank yang tidak terdaftar di Oriental303&trade;, maka kami tidak bisa mengembalikan dana tersebut</li><li>Mohon melakukan deposit / withdraw saat bank dalam keadaan online untuk menghindari keterlambatan pada proses transaksi</li><li>Maksimum withdraw 5x sehari</li><li>Maksimum transfer dana / pindah kredit 3x sehari</li><li>Setiap taruhan yang sudah dipasang tidak bisa dibatalkan, semua perhitungan pada masing-masing game fair</li><li>Account yang tidak aktif dalam 1 bulan maka akan dihapus</li></ol><h3><strong>Jadwal offline BCA :</strong></h3><ul><li>Hari Senin &ndash; Jumat 21.00 &ndash; 01.00 WIB</li><li>Hari Sabtu &ndash; Minggu 21.30 &ndash; 23.30 WIB dan 00:00 &ndash; 05:00 WIB</li><li>Deposit pada saat bank offline akan diproses saat bank online kembali</li><li>Transaksi akan tetap di proses kapanpun apabila bisa melakukan cek mutasi</li><li>Note: jadwal bisa berubah tergantung bank yang bersangkutan</li></ul><p>&nbsp;</p><h3><strong>Jadwal offline Mandiri :</strong></h3><ul><li>Setiap hari Senin &ndash; Jumat 22.45 &ndash; 04.00 WIB</li><li>Setiap hari Sabtu &amp; Minggu 22.00 &ndash; 04.00 WIB</li><li>Transaksi akan tetap di proses kapanpun apabila bisa melakukan cek mutasi</li><li>Note: jadwal bisa berubah tergantung bank yang bersangkutan</li></ul><p>&nbsp;</p><h3><strong>Jadwal offline BNI :</strong></h3><ul><li>Tidak ada offline<br></li></ul><p>&nbsp;</p><h3><strong>Jadwal offline BRI :</strong></h3><ul><li>Hari Senin - Minggu: 22:00 - 06:00 WIB</li></ul><p>&nbsp;</p><h3><strong>Transfer Online beda Bank:</strong></h3><ul><li>Wajib melakukan konfirmasi terlebih dahulu ke Customer Service</li><li>Masukkan 3 digit angka nominal terakhir sesuai dengan 3 angka terakhir dari rekening anda.<br><br>Contoh:<br>- Rekening anda adalah BCA/MDR/BNI/BRI 012345303<br>- Untuk deposit sebesar 100.000, masukkan nominal deposit sebesar 100.303 <br>- (3 angka terakhir mengikuti 3 angka terakhir dari rekening anda</li></ul><p>Note:<ul><li>Transfer online beda bank merupakan pilihan member sehingga biaya tambahan yang terjadi diluar tanggung jawab Oriental303</li><li>Transfer online hanya dilayani ketika bank milik member sedang offline maupun sedang bermasalah</li><li>Oriental303 tidak melayani withdraw online beda bank</p></li></ul>');
		
	};
	
	


});