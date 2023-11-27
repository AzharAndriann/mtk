// Fungsi untuk memperbarui grafik sinus
function updateGraph() {
    // Mendapatkan nilai sudut dari input pengguna
    var angle = parseFloat(document.getElementById('angleInput').value);
    // Memastikan sudut yang dimasukkan adalah angka
    if (isNaN(angle)) {
        alert('Masukkan sudut yang valid.');
        return;
    }

    // Array untuk menyimpan nilai x dan y
    var xValues = [];
    var yValues = [];
    var step = 0.1;

    // Mengisi nilai x dan y
    for (var i = 0; i <= 360; i += step) {
        xValues.push(i);
        yValues.push(Math.sin((i + angle) * (Math.PI / 180)));
    }

    // Membuat objek trace untuk plot
    var trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: 'Sinus'
    };

    // Konfigurasi layout plot dengan latar belakang putih dan transparan
    var layout = {
        title: {
            text: 'Grafik Sinus',
            font: {
                color: 'white' // Mengganti warna tulisan title "Grafik Sinus" menjadi putih
            }
        },
        xaxis: {
            title: {
                text: 'Sudut (derajat)',
                font: {
                    color: 'white' // Mengganti warna tulisan title "Sudut (derajat)" menjadi putih
                }
            },
            tickfont: {
                color: 'white' // Mengganti warna tulisan sudut menjadi putih
            }
        },
        yaxis: {
            title: {
                text: 'Nilai Sinus',
                font: {
                    color: 'white' // Mengganti warna tulisan title "Nilai Sinus" menjadi putih
                }
            },
            tickfont: {
                color: 'white' // Mengganti warna tulisan sudut menjadi putih
            }
        },
        plot_bgcolor: 'rgba(255, 255, 255, 0)', // Warna latar belakang transparan
        paper_bgcolor: 'rgba(255, 255, 255, 0)' // Warna kertas (border) transparan
    };

    // Membuat plot menggunakan Plotly
    Plotly.newPlot('sinusGraph', [trace], layout);
}