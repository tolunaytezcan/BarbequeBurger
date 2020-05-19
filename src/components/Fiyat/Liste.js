import React from "react";
import classnames from "classnames";

const Liste = (props) => {
  const {
    malzemeler,
    malzemeEkle,
    malzemeCikar,
    secilenMalzemeler,
    sıfırla,
    geneltoplam,
    //tane,
    fisKes,
  } = props;
  const urunler = secilenMalzemeler
    .filter((malzeme) => malzeme.count)
    .map((d) => ` ${d.name}(${d.count})`);
  let a = geneltoplam();

  return (
    <div>
      <div
        style={{
          textAlign:"center",
        }}
      >
        <h2>Eklenebilir Malzemeler</h2>
      </div>
      <div>
        <ul>
          {malzemeler.map((malzeme) => {
            // mazeleme seculi ise azalt butonu aktif, degilse disabled
            const azaltButonunuGoster = secilenMalzemeler.find(
              (secilenMalzeme) => secilenMalzeme.id === malzeme.id
            );
            return (
              <li key={malzeme.id}>
                <table border="1px">
                  <tbody>
                    <tr>
                      <td width="80px">
                        <h3>{malzeme.name}</h3>
                      </td>
                      <td width="100px">
                        <button
                          onClick={() => {
                            malzemeEkle(malzeme);
                          }}
                          className="malzeme-ekle"
                        >
                          {malzeme.name} Ekle
                        </button>
                      </td>
                      <td width="100px">
                        <button
                          onClick={() => {
                            malzemeCikar(malzeme);
                          }}
                          className={classnames({
                            "malzeme-cikar": true,
                            disabled: !azaltButonunuGoster,
                            enabled: azaltButonunuGoster,
                          })}
                        >
                          {malzeme.name} Çıkar
                        </button>
                      </td>
                      <td>
                        <h3>{`Fiyat: ${malzeme.price}₺`}</h3>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        style={{
          maxWidth: "150px",
        }}
      >
        <h3>{`Eklenen Ürünler:${urunler}`}</h3>
        <h2>Toplam = {geneltoplam()}₺</h2>
      </div>

      <button
        onClick={() => {
          fisKes(a, urunler);
        }}
        className="malzeme-ekle"
      >
        Fiş Kes
      </button>

      <button
        onClick={() => {
          sıfırla();
        }}
        className="malzeme-cikar"
      >
        Sıfırla
      </button>
    
    </div>
  );
};

export default Liste;
