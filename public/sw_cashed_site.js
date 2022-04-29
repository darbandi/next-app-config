const cacheName = 'v8';

// call install event
self.addEventListener('install', () => {});

// call activate event
self.addEventListener('activate', (e) => {
  e.waiteUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('clear old cashe');
            return caches.delete(cache);
          }
        })
      );
    })
    //   .then(() => self.skipWating())
  );
});

// call fetch event
self.addEventListener('fetch', (e) => {
  console.log('fetching');

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // make copy/clone of response
        const resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          // add the response to the cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(e.request).then((res) => res))
  );
});

self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification('Notif By Next App', {
    body: data.title,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAADWCAMAAADl7J7tAAAAz1BMVEX///8A2P8AAADg4ODe3t7f39/w8PDs7Oz39/fz8/P6+vrl5eXp6ekA2v8A3/8A3P8IAAChoaFlZWVwcHCJiYm6uroA4f/T09N2dnaWlpYsLCypqanKysq9vb2zs7PY2NhoaGg9PT1/f3+Li4stLS1VVVU0NDQcHBxLS0tGRkYH0PQZo74TExM5OTkKYXEhISELUV4JQk0JJiwMiaAJweMLd4sKMjoJrcoLqsYIyOoIHyQLlK4Mh54JRVFcXFwKXGsGFRgLeo4Ma3wJOEINIyagwmdJAAAgAElEQVR4nO0daXfiui6EsJOEbnSj60ynHehlaEtLKd2g9///phcttmUnYen23pzz/GUyNI4lW5ZkWYvnYQuKSWvgYxWeSxV8LpfguYbPTXgO6vgMbxeDv61r0fvbIP4/sv9Hdi6ypZy+weJh/46uCtmSmCh85r74DveFx5LoW/rbuha9ABrhXMfnJj7X8LmMzxV8ruJzA595dv+2rnKB60gP3BeJn/siPXBfd9+orqVSKXhn15xRg5KBuLRa15xRPwvZYrNcq1Z5jkulT0C23CxX60SEXjMISv87yFqtWm4Wg/cjy12db1Yan4RsKaNvYIa1+toEVQoaGZABcNVFXbNHLQXFZj3nkwu6LgbYa2CrQ6viYwWfa/hcxucKPlfxuWlex661bMC4ze2aOWqzan+g6vx/TteFAKtJRJalxBY05uT4zJwcn5mTSxaHc9nZ3bk4Ofm9frrfqZifa9W5XVOjiqkrd9Y2fl/6Sft1vNZRKFdyu64A8Ad0Gc872jz3ZTvfORQIz+lqjVoq6r1a7/z449vt9xZ1r5feD/AH1EXWX7yDf/yM9s9uc0VkNaqd9awP+v4aYfvfQJZxbfzWwLSSZi3GoQK/nCzbAmS1kPlxab7Q8i9fX81H947M/H0I2UQn0Kom6AdqC8Cz6gvP3Fe9fMhwPMwmo+F4PB71bvrXBuUfvAmrjUB0TT6TGpV/2NBdH/o3o3E3jOPCeDQZtOTivg/gpCUyAlqjCa0OjzV8LMNzvYzPNXyuwGMD367Du/CNHVqA22EUxXEILY6jqNubaZh3mDpromvymboYVTPc0pla0avJmL5YSFry0XZ38kCfI/TeA3DSPqRq0ua67UYIlG5hHIWjvlrfTcVi8xTcBk1+U63q9c24HdtfTD4Z3uAfNwi479eNT2H011HbAQxbHHUn1xZn8arF0hzla5dfHoxiF1Nq0RC/d4oQfbu6iPv1rRtnQUaLMboiBP50aKxmkIdsh4XXyzDK+14hLrzBK1sIxjcjW4SR7wqZq6CXV6G7XuavZiJbY2EzGEbzPheGiC0AWH0fssimMs5p+KwPW8mzUjXVKydAw915wCG690zMJIfqjGBgRvW8LXrjLntDSGy7IJcuND0sC7CaYq+StGalSmzNPJfxuSyea/ic/L2CnHgf4BtKmkNunEY3vCFW9UyA1PE7NBL+UCXG1JrEKQIG5m7t4Hik5622AsDqmVFeUdVMYIZRp5FYwsJ4OBx2C1GKvUTdPi3dAS+BpVZvkxLRd/c+sPREbE8m92MxC9Ft8u4lANH4Nt3Y89ZA7mu0wmg0oPV5fZqOCg6TCdujVyEl68WSQZaZ8L29WVGyvrwqWTTRfw0L8MO+R0e671EXPQ/GnMQahIEvWqvvio+4MMO/7DV4zhV9kBrxYi9rGIWTK/lB/0rzhngC3B36lr4N2QNYWI1r98532sONrWmE7XvauSg4PD4UBee0Wy3GFEbj25b7vWvN9UP4W4fg+YBuHCxQNQOjanrPyYg3CtmI1vX38/PZTwOfo1jFXXprU1MwK9Z348hGdaZR/X38Y3d3Bzf1QL0UPfqkR1WDFQBm3biGrVKGho/l8oJn+CYsiCKtuAfQHJMEqB/tqnNQK0HXQoMUvjO1E37gf2cWB4+6GtWNA6Vnogbe46kNx/ACMNbKsgDrZ5SzwQpyFqcTJONLJHnGhlkwr7nLx7TWjSVOohEick4jHOMrFgnH8YRR/bUvzTGgc7yq96InvRuWA1jI2VU1KPzejphqZBmXjpFs64T32kjSctxFFQi2XBVfaI3E2icsnff+Wcf+WtV3xztdHuCPqIv4LxhNxoqKAcJ97CNXo8PUbAnQMJzhjwe1Pdqu4m9xeMs7VaNaLVdoEkHQvSlKAjr++T3Igg2oCWOrPTRUC9sMhCUGVpftSD25uLxxienI7RqN/sW//Dng7vVKMVC0iEs7lLPbfBeyq+5ZtWVvFVU9Mout6pOltq+yxtAviAWMeorXzoQsDuMp/bir50qOivtGcf8IqONgaYDlni2v2OATp2ILIb/YRpozTWFboePM61BszWhEaE3bgoTHtJnP2EZTKzsf6yR/fOKPIPf/4Yy4VGOoVpOzF4aowi7wT/6K7Moci080N4KU4yHogRMLf2LC+/yZhH7lqB6p4q2u2DhnSELLAqzkLCO7kgb1x0hZHPlZIyu6srWl+ox4vISGlOPxQ7KRDQmjnuD7J0rDKQfWqAg7fGXkzG/9O9RFUCnupCBQG83qqg4idBj0rwXnjbsS1/AFXzCqlTMqfhC2v9LFIzgi174J2aLcQMBYlIHY6VriK/DiH1emymVmxVox4QxkXZ6I6inYkL9DNwZuMWPIoxfmT1ld9eUNkfJEsCSzgfFPv0iUVLNGRVmx7RudDdkxngWWBBjOs7hnK9hYQ4bGymTqmV4BjgYK/FQyY4AmryvBT0LoNnJxZdb0zPs7Z1T4vFAr4htmZtUlAJb4rWqDgl/W5P4B43WVaCOzKz8ckMR1zBgsdPV2zRs1+YtvjAWaT6xsg1pRgyp7DrMAMVKnvtldeXcEiNbAskZGEylx5oyatHMjAVDQbi4J8EfURfjlh9ApCkoM5CKb8Ckk0hqq/m9yv5LqKLT+OcgKcYdmt51vQBb2j1SguouRVV3RBHMjjwVD3LAN9d25yO45yG68B9kV73oAKFBU7wloFPB7Hpv48rriym6kWVRM2BqHkbxRk/bLaG0C2RXveugWDy+5lPUYL8XYAGueK3RvloOsN6cr4op2ib4jfEhPxv7enFGrNrKota1r2OcDLPBTh7KVrjvF0R2R/aNmP6+rx/amp7RNGVnUM3fOGTXIRXZJgD+iGwsGRTYZg2x2V9JDhInQtDYe7U4Z0OxRXWQ1GdeWBPgj6qIUPfHlMsg2ke2ONa5CXUQVjKRPM5iDbBaD+m5klZydjyxaWM3FUDzqa0YVhqgbo8bZmINsluh5L7Kr3PXsCxGCJxDFTvO64hHeHHSACZujO53Y8Bv1nFEBWVepOBXILn3Xs6LDGMBknUCUbpzdFVkIKsaPGrsYLb8TgTv8/TfCnT2qR1aoV1ddXNnDDZZ3BVdA+GvmqSf5SEZXaKgWvxi67eKNbeteUzVpyOQ/EGSOmnMQWNl3cUUNCkhdnmfxDhHOoo3Mrh4zpzttSAxDvrNqmT2MH6FTcSPTezf53c84Q3+5KZVn+c6d5WYpB9lfNiOO+LLW9y/11VwYX2m9MUddBGrqS2rqfAeysIEAstA5gVRykMWLmpFZRLQ37WzToUBji0yKNLEgE1ngE9YZuvQeZFfUjYvwz0/BGZXBrZbZlTQnw3ppe16wYcoIIPIf2KDRsnTjlA2quiTAlm5MaBaFnMXnnGAKOq09C9UNWOsv/gx2ZYlHzoiw1fyBEbCo+f+CP20ii9bY0k0Be5nUypWGGFXdLo2U1uZYFxcDTOv7vrieU19cIb7yNOOwzYp14UMb1uxN9Ha5FMJX0Dde39oXKB4JS/jiiTO/IKlqSwMMsuKdGhTS4KPcQMJd1GqnDkLIh9Z/bCbtBy5ta2wmAmbtV+oTyaEGxkxmqSVJ/hig+xY3A4s1KtmTauXmvk2q7Vs/1YzXGG3bzUqmI35TilmlU1S+BdlK1tBmLYoHa5vr/7CD3pPZlr00rpJJ8cWAf36yvrl2ULS2Q2p64Ta68V5kV9GNLUVV37wkrbZ9uHm2Z+HSMht2mHILwTZxqFy3n88/Do8YZUsdh90N/HUFgEvEk1d2M4Av/fbtm61Lr3mw+3yegYpRCuPp7fTxZjKZ9Lglj5PHx2nfTMc4YzrO13c7FcmMiSXWlwd4CVNqkCOjcQo3xYpEb5kL5reur/q3E2Ffi7ObvN8b3favrrMI4NLwMiHslgL4I7oxbg4896hN67Cd1sPT7KY3GnfjdpR2R5zfEtTbYRec72dXDw7S18pccO9rX7kvVhf5C8l4V/JumNfy5bE37IbsQ78anqahe2YUhd1Rb/piUFb8Ca/6ya5eT2j0U5DNoQpu8oYWyKr1NpuMusav/zMaBxyMJrO7ltw2L8yfEORKMfgCMi4JZLdPLyXDmN2MukCyn4amhTKQdnd0M1D+IyGMvWm03Vplwb4TyFJbQvTYmPrSne+L8LQxVrgOWTBtakf0anNZ0cPIzlEqJLKNXRM3NkhdQH5HiycagH/W1DmyXvkkDSowuszhheGN09HSqxmyjElau92OdFP/iR1/8QXtfmaCup6Ng9gnIGvCAZs/9BB3j8NFUkU68Q17vZvpdPYyeHq6u371MYoNYtleH+6ungYv/en0sdcbxZmdM1ocxcPbBwXL+ZrcZR9K3aCcQLztY7Omw7RrvACUBEfX/JClF2U0o2sVxuECvh5G8cis76aJcENHm/wjHhkZi2BvbMJ/Ej0+eUzOwmifZPP3tg4c64/CXEwRzXA8mkwHd3f6VzwDLtGMSSoevF7NQGLHc1hfHBXutf/6hnZhQ+BriAgaUYtVEZw81yxTc1C9m3RzYoyAXcaJgJhd0Xwb02E0ycIsq+krvrDLM4tKSpiLcRyNH1UcwYYM/1o5PE1h7TVVOGtu4BiAN7p5kfqdvoclIl5fOzzsbB+VSpihQLVqrVIsBdudrcP9U4uQYzlBradpb5w3bhz2lGp+avbu6hoU3y1s8pD9YTs/cGzkbMtXzWOQiPWdZn5bt3rF7uFilj+2CjwRAaerIks3yN4Wc4HZOB04FhpB3zXIYoeevUbb3sJWxlEUIdONiAgbNh9MYx1HQ0b3JwuiSpCDrOsaVBI2rxo5a/kvw1TgWAgMoq9UONRXL/eOdztNsIxp6wTNwqn5Yk5WBo9trlr+tGfJ/84r2/unJ4CyNgGEiXhPy4KwPWIuuMPhqUG2axCyqaZ9scVaBHuUvo1Sqxq3uz2IVlZmazz5nKk+xorWxstXAACumyCiN4UkhKrhjgGFRR3j2Fy6q76olDVY8Vb/PkyxyTi6J8l7SYsL11w1cbFVzU3dwDq/ipFzvxxGhR7HZV/roAj4f4V8s0zUGtnQ6KLCRLbZra6VFnhXW+eI/hs8CTo+YMoM5D52FyCOHwkm7UG2VHga2ZWbFKLjxsgl5DsygTe+Rce7ZMJ4NS/DbK8j/QQNg2s9Gdq2p2EDxzlzKYQGkGcnqibS0VKXt6lI22hMW/eEp28pdVFbS+Fe0d6sYdSdWNFZU2k++EUxtZqZRLgOQKM1fYNZ2t/5RV3/PK855uY9QbCaKmAKXphxqRMPtateIXag40iZ7aWRxUY+wgM3Rk4Ejq1vdQQdU9QYiuQrW8TiPSpfQlT3T3yrne/KpDl426WFbbuP87cnfkMqPt3X2SIuH51w+4jd7w81hgtSN0Ajnf/RDqeLhjM1ym+MMbLoGP6GmpbRnYCq/oHPMUYqrN1qrAtov7CHgiXPToG+NGk/4GJ7zTWmDr81G9uBfGwRW6Ptkp26QTt9GVytACNYVZ2f4AdPEWxQxYw0hWmlDylbXIxsq5Nw6/Xq6enJ6FtbGtsaTbFCjY3mWh2jqBr+2o5B11qTNpnEfuA3IY2DdPqydeOyXoFXK+o57ioCPjnUnAbITodaxhTurcVOWIAfdjSuvKyvs1G3AIfYRMOccoS4eWnf/gIrvhb1/FDvVtfYHO/E/EU07eqSIl83RoUCxfuDFUylY+TswDGwiqszPLuYarFDd5BaX6UT4nXPqASYzYLuAP7Rr0GemhdNG7RIOlQrtEnF8w5497YmVqz4GCeJHXvz1UW1Xv6rxDUaqhg5R++D1VKeJMSOjKqDO05rq2cMk6P8xHz/c255wmk9iuzvE8nxgQfUTRYqdSC7k5FDcRcVjM58ZOEbGAnmy1CNgoqR06EAipM1JHooavUNAJLcuYIJ9RM7UFYDhsJRX1UCP7+zxI8ZYMDTV1b7DtHl1Z1asTS+Jqs83RgbqMPCkUUl/jAxcrWGubWHgbR2k0D2r7nFMnPL6sJTtrUlxGnRIalN35qygSAdpBXYaA0LYBXzJxeXDhKY46Ei73oqVtwB6cMimkrJabXf62X1OjBu2N5a648fhD4Bq6Bim44Q1zwrS4hKvw6XAUmgz3owZ0PJFOCTdQ2wdLhIlkgEC9H2WNMI1jSCnglnwIwMxiuYp93/zUehskpQGVBgDMgKzT3jR8OaUf1R8wlc5zrfohSShwEL4zqccoz46d9pdgUUpm+9RWwOrDUpK7dGCBHgOuEYh7pwX+Fde2k8dkLSNpnP1IqBUEjwCLXhCzE41pwFoz7VyY7Sd8yxGJKMUQLo0OJzw4nYJcb/NaXy0eIOYgP6tdgcKXVRrZShRXZGuyRuX28ElvaFBkig0JYZQOHaE0vlWUuV2Uj/ULCA+JxpnVNvDOB/WsimkCUhIrClyVGL6SCLxtY1yQsLMa7rCe+MlF6NH/opZ0cv1YMADFbqdcF1FxpvVIcOsking2FPKWSrfNlzQtiqHu2BoC5HN0Y09iToRPbr6vOpCE3ckkCjV86y0VkUvbI8Yu8TdzrcpbVoFHj8ixNNgBeVZ55JWCfj6fi8eOH70tQ3VFB4WjeWkbQYaKSZa8/gWssNvq1lbMhQ7HOU261FyYXooNphXI6yvvnKL2RHCNMUnFm7sA2bcEtCb8lZoGLlSEx0g17AKKsyXBQCFSU9s5YWFcVLtUzggPsyd8fizN4wHSNJrkuJZmZ+T69pRjydpgmTP2PCLKqcpRtTRK66851qKsgz1gWaRdkrBxxJh5xJ94v8ZqKdgVzQCVBe/pAjDRGLyJslzaF1RUZCgfXJilvNRBY8fljukFWJxFpuKltkUcAXbqRmCoukFUUZMj636cgv6LTjcALa09V5yJJvHzpyK8GPewMWJMtbpix4MdLNibcA2TJ//8GogqG9sOQytRhXNIsDYHjKrDhLi3KHOWseskTOsG21p2Gf93lD6sasVx+J7YUnfgY5z62I9fFzS/rE1o5FwrpeYmF1tDNJN+AEb3ppibGKzJSZjluBm/YAd+KWRFaF1HpO9LHy/S/PjcAFwFA4a8UCFxYU3Sp+E7j13cIty6uwjfBom8W9VhBmLBfq8+OaeXKV1oriCkFhgD1FG4xs30W2EeRlQlDT1fEt/U4tAvHA8qrIUqtbQiTSyAYZmUdleFo2sqnwNCZjbXufMvtLPrUg5S+wIJPNDWfpmAaov4OMqYGqK7KmoWEAxqtYuQzTt+c48wOXjFMalOcwqHvm28mKLihf4MsLD2tpneCjucgqBqXXR2qhOIMYHrwIWWBQVl6WTgayiIXknGgIRhoozkf21Jd+tAzYme4ofDrnNO0KbxZWHgppBiueSf+Wg2xHzrwWPSlkgeNLpQIJHi0b9bm5tlP6IgEGFFkGPvljNaUic2H5pIBBWnPTdNfPfce0wVfDDHCTQ2oVX9WnU9RwKXslht3W0hG4Ve5jnwRwabEj/B3VxYwEFXbDqQVk8FwIE3RtTRDuKhRo1aaBoCZinBHQ55S6iPGJCmBLN4armlYsv89H6maQdd2J/5y7i0BqmknU4S91ELhWks5zT9XiBdxVrm4sLpTRcK7JqK3ynzWzNCjndEpHPNJbKkGGBqXi8i4dUxre0vxWEEiWkddCdcSrq8jru6xjI96llLI1KI/DL/rpI16mKdU9vIdPZm2rGcjCL3BAcc0QJCmUuQhMeK+F+c06vKePAQXFwYATVEo5yKId3kSBtRUHrwbZyNqcgW4wOHdgXUQDCZdQeMGEqyjYQdfcU+8sa5ZRQFsHPGOWuWX5jRgaZJWrfA2P7nfGmQoXtkizkxGe5jmGTBX9uSdsPU60164vHTb1LU1Xyy2PL3CGcwiZQnqUwQ2NSfr1rg6WGirp0LAct7h4xtGljWuINr9nfkm7J2tvCmDeqKaZs3hYoMsYhrtqReDCL3+ksLq3014qkwgeArOC+1UjU6qy6l5I9h3dPETyrTWGuKpdQcykW3Z4Oo43FYLkWaHWV+m9eKtlrM0qM9U6g1IxurFiT1qriwbaTEbGUbUJ0dpzlWtzI0ao6MDyQAESMXMp94Zloziiug0iAx4dgE24USp1A+105/pDJf3UwFBfYTZWngbAlga2AUsBQ9cfYSYlO9cfSCu3kkJM5s5XIdHASq8iAE8JQpFuivbRLwvgYoabAfKoByEYoxE5X/0+svvyu+JCQDJR3DLH6n262BpmcCm+2PpHvQn0aF8FGu1vKnZ2oMu/kEeE9XXmNYBPdb5PRcfe6QAPkbK/oSVag9RL96pH6FJER/rMhv6PrRvXozWOeniV9FOmfTJXTbTojxaL4jfVjfgh3+c/yiSOxGlQ9hXnh6cR0V0JhhJG93wHfqrQrePmBV5iX08IleRFLhg7VV33ClmX0b+r8jV9IuSANpMS9srdTlvsW3EliYZxxQ3bzErdwJ7G5DaOe8AqEKDvaP0dEUjR9N3rWcGujK+MmELgIj1wnY7AYXfK7uDGzQDFjrmLZpdE7SwDWtSFfrm2z6v60LOzz94ZJqC8jjNTN5BzG+qYMncguMoo30/jlg+75UUeMWwa1LZYWrdtFZHYenh7GryZKDQRjwpCyvGEEr+EIfvRQWsoL/7WjcxOmigTOIXqunR+XI8hOsddRjtD+nv7pLT848665VNJNz47NL/W4lpt02QQs/1HyOC4blEPKN1oPT7Qru1T2xWK04HrS5u5Lrhs18G1dZKFxwZdf/2gTlRsed/hFtIqCSmB0g2jbvy1eNrY6avegH9REBjHR7wxqsmE4LjWJ97Rqerven2p/LIiF/gy/sakkrhp4NvDF7Mkm77rPoKHV3MBh/doe57VmofKnW/PuPPVaB/BDJtLd4yP38VP6rMJnrF1ZNHdxPHnUw5usmZTOnVDiZE1MQLsf+vWbAmj8VT4PNt2jR3iz0aJH1seM7pVK6VAVEmrN+j8aHvz6fII8KvlCcX02x9FOa6LbHbKS91gh7rQv0VCalawFZ8wCnuamg0VX9MgeAFnxA+qyBWPjlkLXHAx88FAB0UM1VlC+tFpnpUOzUhYKDtVaZ/eedkMjBmWJTE5arV6rq9r3O7ekGeUOikbRzvYTpdGRYXXUFg0M/2N6+WGdoxA3cl44MKEogEAzCdGoIHAv54OU9WL4gJngzaX88tGbLF7NbuSP6UqyyQKwfDxTWR0hpGokonNZExhEuWeLv2Ma1D/kufA8a1G5pZQX+MAucdI0/H14zDlWA0ueESH54IfLh2exrbiMgcJZMRDhHE8nmjbFi30n7NNDFoxPIo2WVZxSreBLDGXKLiCvzYvFH+41cSVEW4Txz12wTsl1OqLkc0IT9Pl0Vq3meEf6sFNVGB4FB5Vnr2FzY6HiKb293RCjnRLiEyF9pywp0ueoXtByl/PHKAy0VVT23t1sDWhKUTI1WzuxK1WxiPvzOZOBtO72SQX1VCtqtKay7mXU6U80WOSAHkB03JrllsAK466o5v+nQHR6FFtlf/pfO/nycXz+sbxBrfjjeezi18/TUCuHflE31Hh5dmoRt0bFZ+2K6bzPdXTSipqoaO83Z+SU0v28lIw3rA3fXm7BJz7msS7r/5yzYpOa0Hs4f2wEOVG4iUjDnVohqpHRxh/JJtB0g4Uuq/zAkopJL8wHvUedXwTM9bFTWQn7PWGY4g3nBO5CtWLdGiGLqxY/HjqBlpdpXr7V5NuSsylcRamjse363/nxdC2/v33bfAizQXzcyJAtJiKLEqk+q46zzeDrIR1LrJ52flKlswIdjR0g153XsCwuwroJl/odqEK10g0KMrV7cLf29HcInFWi7q9Fz13F1ueRjW7UnXqiMc19fCZkcVn6lvWRpM1XXyo9TRZxgdGrgfVugx1npWQy1+u9JWkPRkqOTV+xxLgCj7z5SM+W8Jg6dQNJhxcCPrvaMYLVIWbPutTPxDw51ZP01/eYlGkuGeYzzE/CU/g9EN98kEL0dmh1jsp6conJ78yVbqraMlW6Va6rf7NiOLTPxtlYnXj+8fBpcm2BSZpY7b6okxfCZ2rNUaHH+vYBfHp9xSS/xk4U06EEAT3gM1yJttWS7ujvR/ZzNQN5lCAOaTZbR7MB8pIET/qXZwodoPHCRQEpkwbq2NNeR8AS8iJYAusVPKrrBxuy6RuECHDNZFatozPNTu1rGenfGynUjO0Wv8+vUwn9wnW8jortJr4v0B2OLq/mb6kckFhS6U1WxZghd/81A2ZCSph2kDB0OlWAJDjvQzofMdnaAhVpUGwYksekv8mgtdoE1qPttuvnX2wO+qEULq2ypdXFnbTSKOR4gKK0O+f/r5MAfpmDqI9KO+NeVZUox/M/XEqfV9yQD7chgGtqjkql/P3FBRLDa1tIZXO4e7GicxcZ/KkZqVdlDeGMifCn4udtcNtocBl5gP8cmSBKcgsiFbBHtVqxc7h2ukxnh6Md0R8lYGsCZjCq5zLzQTJRtVzm0zPSvkA34NsTuqG3Mx+8GcrfajtdGg3xFakSqWKh4TlJf5rPOrJFNnJ+ZL0HYtVJZmlAJY+pU23joIq1OuWXeCoW7f4hxq5XilX6649Ap2kjc8FOXWwI1sZNrjxPuDsoc4H6sqhy6oRpNjxMgBLLzX+6BK6sVA1XZpSVv9qUGo0K5IG0T4pEvvilcYxogFmYpkXFiZN3ZXXq7WycSJcWIlpIcAfqSz8M4tbcFdlvqo1kaTgiqwl8uAik4KrU7yeFknY8V6FICgXSwbiEkVLpRKwY2zpsgB/IDEsuNQoNy4jB9yuDC4uoPDYwZvPw1Qu54lv+FyqaAL7LV/KMYHgv6NCROYsZ3QtqZf9N5NsnhzJNm3mRJv52MtBNqtCxEfKYSxR1UVbJqXHufDWTnUNTPSJcK3SWc7EDKBRTidSckdN5aJlPYbNa6tXFl62hpryqk0VTcjsikxm0xansTIKGzUxRvUaJz5zVPjMsRHZyBQx+H3pom8cELFiyl+YwENXzAKbS1V60KgAAAfZSURBVE5EGV1xXi9sJkXmRuFr1RY1E4Kc6mko7mRFpD9LAvyRysKpUnGq0EkpuyvW7UD3A+OiAdwoVQ1jhyDOHtWztIpQVjH76uppq5SKwy9jfh3hvdieZtc5mVdQLFWMr04z/NXV06yK0b4/t3oaEdkWaVLGjVJ4R1IqvvIyyN58FFlXN16wBQBZUBRUedSCRnZuxUO8ZJ0Z50LjGxmisZCvVfMrHlpZydvXjOwXVxZWjFFqi8gr8rsgk0IL7E06MEJUncqJSC5TbWFZ/EMjuyLwjPJKVUrXc1TjedXT6ADUixxc7XpiOaPq0vIpZJcEOJ26YXkNag6y2V3xb+e2ACKoUUtE1bpayh0Vd6W1Z/+1kf1KdVGQcWEpZJF+mo50LSiJi3VP8OplaWQfvhdZqcwsLBXXNGnhhAVOJcxC6qrPGRWRlfIulPXpvriysKx4WLCRzd+zXoMK2YuFDbuoJv7Bha8X8/esKl0gyyyCXWYF3TgQqRtYmUyeKvOf4TuyJKuui1fJ6coKMmcIsavthjF5B5JVJ3/UqmcX7Oly2YT6EgDT8/srC6eqIpW9hZWFyevm1rmFVYl6dPqlfDkra8vrU88X68a5B4Gcrpxb8hT3a5acJSegXYVsrgaVdZ79at0Y/mod8XTGgMyurHah522rlxVsSdJHOQg3gxxksWa0a6r+jlJxVo06VZwit1Scys55KaSODIzgguB/CIZacszOQjbwRYi6GvOrq6c12B6kEphpG1Q5sys0Sgd9JVyX4/Gb9T9KnHaoFjerepplSlUGg6+uLIxcfS/jtrTudmUwA7ryuhVrCfnkHqyUeMSUj6lL3R3VEXfEFAGQpQAWz2p9V7FBob6oLvHwtpSX0fEENMvakvEZbJeRVK3Cwpgr1xIWKkaFf33rqp9zxiwN8AcqC9uyp28o0PbxTFqHfPWurCyOyglMxltEQ/KDO1bT1jBX4PATbPsredV/7H1n9bQX6eJwJldW79YieZq0rGgq5dtuZ9MzYWHaLFtVoypa0mERKoVG81uQlcVgSTsmDlAtJntEKejlU4L+zYqm4iy19DeZZjfkSDV/z6o710R/WgzG1zF5V6x0LQ/wh6qnXfgicVTfl3E0CkhGFVKGClwLFArVIWuyrT3qxf2VKrO3LkgJDc+Qgqm+AsBW6ga6LWsgT4bneg2fy/iMLK5Rw+dmQymMdrLfLQu4jiq0YGf5jsbk+QJ0QLqyFQQXtkfsGbO3b90H4szoZJMqI0N9OYDxOZ26YbnrTphOuBPQQQrkCWFW42hX3bw/WSn5FaGe8MQj87LDwuL4Ru3ojW0rtbC5K8FwqYMVAH6/btwwafy0qw7dMT8fdrY7h2sb2q/iamT5RIfhjLBQONQpNe6NdTiIu1OTCXxt66gYdCh6zE5LVF8e4I+oi/QjBvbrxJ5uNQwAbmCjqvMGE7elj5EQtjOfh5FA1zS7nAJfG349skVVSdlklIlStT+mYxvVRG2QieA95id08Lu0w8IgTMrxvjBSiu7Fjt6J7Mp+UMTgNuTSJsSnE5b7rbtpKvImGhP0Z+amnzhpg5VJJywsjsY3V2YCn0QtbWAQ6vJ7Zd1YeriJrAhphzFTVwKhBSDMfU1CfL3H/kt/OgGXTTeaKuRlZRJuNIqedr8gj+0Ht+RGCDEWk9vB06A/ETFUJrq8tgLAujgRz3RxCd9FI6MZyFfh6o7hAVl+/WE0ot26R8QHdbtkICCHhc26rk2ZIg6iyIpmhzMAhglBXfmVfRcNsisoJB7XnFlcLS6MxqwqsCNMMzB7iAeh6ANb/chulPe5obD6FnXRrMjt/ExPCXWzW9ueCpIrCoahCoJw9oXr+7y4IYXro94MxdUA/giyyBMwVnw6J5ABUGUuI3KBSGRLHElWYef0t9G81SULzvN7AP6IbmwcYfx+dmIRDMScMTd9FrlbpUcS8lL2YGat6+2+kBe0RLa58/p7AOZRpZzFXSzElgymKAmxxafgMhHfKFWmCXNQaFmpUvKXRdeSGJXFkaoM8vA4zggbCtssvZq0UO8CeOXKwiUhoyu0HC8QxGX8imOo06Qjb/a0N6LsaiU85XWvnWq5CnHPkgnHeu8j2M0FgUifVllYKiSs3kK9RxCv2Arj+6nRBy6E46WVU1aOqnauPgIDOU/vKXkHONGPJ5wkg0K8IQXx+wD+ELIi90Tr+mrQHzzdScVxw/JWzUU2+VXVaaqtGf/s1uXVYHY7e7nSkYubZg3/K8iaGoFuuzjUsSIZ2YKzR4XWOc75IO99xPWdAL9DN1bMlJejeJoG7PhQW6JqxaN015xRqVUPdtJf1Flejt4PsER55Rrxum2vmSLvv3f2XV/rvK7uqBWjsgT7G6ZE1cnpgaof0cjp+lmVhRdlweVWLm53tkuW0bhaWZBT1hnVNjknmG13Dg46ImqwXFqQGPYrNCgJcV40e7XcCLJU8jnI2lOVajWsUfFfRTYw1lPZykFpcdecUbO/SEeXT0I268SE7y+AONkPRbMkdea9S3XNGRU4kAlzpKJJS3adN6pCtiQmCn/nvvjMffFZpOIppbvCJW3pfV3dUXl5KslJX13YLNs1b9TiR0TPX9f1I0pFjmbwv9v1/8j+T0P8UWTzTkxZaR8c9v9XdWUjY921SVIEbjkVdds0r9f/uq6M8oqqpmtb+Uu6/gfUSIXvf/05xwAAAABJRU5ErkJggg==',
  });
});