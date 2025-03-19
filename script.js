// Menampilkan intro selama 1 detik sebelum menampilkan konten utama
setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}, 2000);

let bluetoothDevice;
let bluetoothCharacteristic;

async function connectBluetooth() {
    try {
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
        });

        const server = await bluetoothDevice.gatt.connect();
        const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
        bluetoothCharacteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');

        alert("Terhubung ke Bluetooth!");
    } catch (error) {
        alert("Gagal menghubungkan: " + error);
    }
}

function sendData(data) {
    if (bluetoothCharacteristic) {
        let buffer = new TextEncoder().encode(data);
        bluetoothCharacteristic.writeValue(buffer);
    }
}
