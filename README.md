# mining-monitor

## Protocal

### Miner status

#### Fields

* Name
* IP
* Server
* Ping
* GPUs
* GPUs.Name
* GPUs.Temp
* GPUs.Watt
* GPUs.Speed
* GPUs.Efficiency

_Example_

```json
{
    name: 'Columbus',
    ip: '...',
    server: 'us1-...',
    ping: 123, // ms
    gpus: [{
        name: 'GTX 1080 Ti',
        temperature: 74.9,   // c
        watt: 113,           // W
        speed: 288           // Sol/s
    }]
}
```