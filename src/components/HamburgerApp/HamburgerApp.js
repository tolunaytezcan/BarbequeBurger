import React, { Component } from "react";
import malzemeler from "../../constants/malzemeler";
import "./styles.css";
import { Hamburger } from "../../components";
import Liste from "../Fiyat/Liste";

class HamburgerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secilenMalzemeler: [],
    };
  }

  malzemeEkle = (malzeme) => {
    // var mi yok mu kontrol ediyoruz
    const varMi = this.state.secilenMalzemeler.find(
      (secilenMalzeme) => secilenMalzeme.id === malzeme.id
    );
    // var ise sayisini artircaz, yok ise arraye ekliyoruz
    //console.log("var mi yok mu", varMi);
    if (varMi) {
      this.setState({
        secilenMalzemeler: this.state.secilenMalzemeler.map(
          (secilenMalzeme) => {
            if (secilenMalzeme.id === malzeme.id) {
              return { ...secilenMalzeme, count: secilenMalzeme.count + 1 };
            } else {
              return secilenMalzeme;
            }
          }
        ),
      });
    } else {
      this.setState({
        secilenMalzemeler: [
          ...this.state.secilenMalzemeler,
          { ...malzeme, count: 1 },
        ],
      });
    }
  };

  malzemeCikar = (malzeme) => {
    /// olmadigi durumda azalta hic basilamayacagi icin bu satirda malzemenin secili olduguna eminim.
    const secilenMalzeme = this.state.secilenMalzemeler.find(
      (secilen) => secilen.id === malzeme.id
    );
    const secilenMalzemeCount = secilenMalzeme.count;
    // sayi 1 ise secilenlerden tamamen cikartiyorum, 1 den buyuk ise bu sayiyi azaltiyorum
    if (secilenMalzemeCount > 1) {
      this.setState({
        secilenMalzemeler: this.state.secilenMalzemeler.map((secilen) => {
          if (secilen.id === malzeme.id) {
            return { ...secilen, count: secilen.count - 1 };
          }
          return secilen;
        }),
      });
    } else {
      this.setState({
        secilenMalzemeler: this.state.secilenMalzemeler.filter((secilen) => {
          return secilen.id !== malzeme.id;
        }),
      });
    }
  };

  geneltoplam = () => {
    let totals = 10;
    this.state.secilenMalzemeler.map((malzeme) => {
      totals += malzeme.price * malzeme.count;
      return totals;
    });
    return totals;
  };

  tane = (malzeme) => {
    let x;
    if (this.state.secilenMalzemeler.id === malzeme.id) {
      x = this.state.secilenMalzemeler
        .filter((malzeme) => malzeme.count)
        .map((d) => `${d.count}`);
    }

    return x;
  };

  sıfırla = () => {
    this.setState({ secilenMalzemeler: [] });
  };

  fisKes = (a, urunler) => {
    let tarih = new Date();
    if (
      window.confirm(` 
                                        Barbeque Burger
________________________________________________________________________
Tarih: ${tarih.getUTCDate()}/${tarih.getUTCMonth()}/${tarih.getUTCFullYear()}     Saat: ${
        tarih.getUTCHours() + 3
      }:${tarih.getUTCMinutes()}:${tarih.getUTCSeconds()}
Malzemeler : ${urunler}
Kdv(%18)= ${(a * 18) / 100}₺
Genel Toplam = ${a}₺
Devam Edilsin mi?`)
    ) {
      if (window.confirm("Kredi Kartı Kullanacak mısınız?")) {
        if (
          window.prompt(`Tutar ${a} tl Onaylıyor musunuz?
Şifrenizi Girin.`)
        ) {
          alert(`
                                          Barbeque Burger
________________________________________________________________________
    Tarih: ${tarih.getUTCDate()}/${tarih.getUTCMonth()}/${tarih.getUTCFullYear()}     Saat: ${
            tarih.getUTCHours() + 3
          }:${tarih.getUTCMinutes()}:${tarih.getUTCSeconds()}
    Malzemeler : ${urunler}
    Kdv(%18)= ${(a * 18) / 100}₺
    Genel Toplam = ${a}₺
    ${a}₺ kredi kartı ödemesi yapılmıştır.,
    Bizi seçtiğiniz için teşekkür ederiz :)`);
          this.sıfırla();
        }
      } else {
        alert(`
                                          Barbeque Burger
________________________________________________________________________
    Tarih: ${tarih.getUTCDate()}/${tarih.getUTCMonth()}/${tarih.getUTCFullYear()}     Saat: ${
          tarih.getUTCHours() + 3
        }:${tarih.getUTCMinutes()}:${tarih.getUTCSeconds()}
    Malzemeler : ${urunler}
    Kdv(%18)= ${(a * 18) / 100}₺
    Genel Toplam = ${a}₺
    ${a}₺ nakit ödeme yapılmıştır.
    Bizi seçtiğiniz için teşekkür ederiz :)
    `);
        this.sıfırla();
      }
    }
  };

  render() {
    const { secilenMalzemeler } = this.state;
    return (
      <div>
        <div>
          <h1>Barbeque Burger</h1>
        </div>
        <table>
          <tbody>
            <tr>
              <td
                style={{
                  width: "500px",
                  height: "845px",
                  margin: "auto",
                  maxWidth: "500px",
                  maxHeight: "845px",
                  border: "5px solid rgb(204, 51, 0)",
                }}
              >
                <Liste
                  malzemeler={malzemeler}
                  secilenMalzemeler={secilenMalzemeler}
                  malzemeEkle={this.malzemeEkle}
                  malzemeCikar={this.malzemeCikar}
                  sıfırla={this.sıfırla}
                  geneltoplam={this.geneltoplam}
                  tane={this.tane}
                  fisKes={this.fisKes}
                />
              </td>
              <td
                style={{
                  width: "1500px",
                  height: "845px",
                  margin: "auto",
                  maxHeight: "845px",
                  border: "5px solid rgb(204, 51, 0)",
                }}
              >
                <Hamburger
                  secilenMalzemeler={secilenMalzemeler}
                  malzemeEkle={this.malzemeEkle}
                  malzemeCikar={this.malzemeCikar}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HamburgerApp;
