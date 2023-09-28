import Container from 'react-bootstrap/Container';
import {useEffect, useState} from "react";
import { RentFun } from "rentfun";

const rentfun = new RentFun();

export default function Home() {
  const [rentals, setRentals] = useState([]);
  const [clc, setClc] = useState("0x1eaaD5A4838Cfa3310b0405a447D908bDa75E62a");
  const [renter, setRenter] = useState("0x3353b44be83197747eB6a4b3B9d2e391c2A357d5");


  useEffect(() => {
      const tryGetRentals = async () => {
          try {
              const rentals = await rentfun.getAliveRentals(renter, clc);
              // @ts-ignore
              setRentals(rentals)
          } catch (e) {
              console.log(e)
          }
      };

      tryGetRentals();
  }, [clc, renter]);

  const clcChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = e.target;
      setClc(value);
  };

  const renterChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = e.target;
      console.log(value);
      setRenter(value);
  };

  return (
      <div>
          <Container style={{marginTop: '5rem'}}>
              <form>
                  <div className="form-group row">
                      <label htmlFor="collection" className="col-sm-2 col-form-label">Collection</label>
                      <div className="col-sm-10">
                          <input type="text" id="collection" className="form-control form-control-lg"
                                 value={clc} onChange={clcChanged}/>
                      </div>
                  </div>
                  <div className="form-group row" style={{marginTop: '1rem'}}>
                      <label htmlFor="renter" className="col-sm-2 col-form-label">Renter Address</label>
                      <div className="col-sm-10">
                          <input type="text" className="form-control form-control-lg" id="renter" value={renter} onChange={renterChanged}/>
                      </div>
                  </div>

                  <div className="form-group row">
                      <span style={{marginTop: '2rem'}}>
                        Rental Amount: {rentals.length}
                      </span>
                  </div>
              </form>
          </Container>
      </div>
  );
}
