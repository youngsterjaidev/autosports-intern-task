import React, { useState, useEffect } from "react";
import { Input, PrimaryButton } from "./components";
import styled from "styled-components";
import Modal from "./Modal";
import axios from "axios"

interface ImageProp {
	src: string,
	alt?: string
}

const Form = styled.form`
  display: block;

  & > div {
    padding: 0.5em;
  }
`;

const Label = styled.label`
  font-weight: bold;
  padding: 0.4em 0em;
  display: flex;
`;

const SubmitButton = styled.button`
  background-color: #2196f3;
 	margin-right: 0.5em;

	&:hover {
  	background-color: #2196f3;
	}

	&:focus {
  	background-color: #2196f3;
	}
`;

const CancelButton = styled.button`
  background-color: #f0f0f0;
  color: #000;

	&:hover {
  	background-color: #f0f0f0;
  	color: #000;
	}

	&:focus {
  	background-color: #f0f0f0;
  	color: #000;
	}
`;

const Popup = styled.div`
  width: 100%;
  background-color: #2a2f38;
  padding: 1rem;
  box-shadow: 0px 10px 20px 0px black;
  border-radius: 5px;
`;

const Grid = styled.div`
  overflow: auto;
  height: 50vh;

  & > div {
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 1fr));
  }

  & > div > div {
    display: grid;
    place-items: center;
    padding: 0.5em;
  }

  & > div:nth-of-type(even) {
    background: #1a1b24;
  }
`;

const Image = styled.div<ImageProp>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(${(props) => {
		// @ts-ignore
		return props.src
	}});
`;

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [scripName, setScripName] = useState<string>("");
  const [buyingPrice, setBuyingPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [total, setTotal] = useState<number>(0);
	const [result, setResult] = useState<any>([]);

	const fetchData = async () => {
		try {
			let res:any = await axios({
				method: "GET",
				url: "/.netlify/functions/users"
			})
			console.log("Response : ", res.data)
			setResult(res.data)
		} catch(e) {
			console.log("Error Occued while fetching the data : ", e)
		}
	}

  useEffect(() => {
		fetchData()
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let name = e.target.name;
      let value = e.target.value;

      console.log(name);

      if (name === "scripname") {
        setScripName(value);
        return;
      }

      if (name === "buyingprice") {
        setBuyingPrice(+value);
				let newTotal
				if(quantity) {
        	newTotal = +value * quantity;
				} else {
        	newTotal = +value * 0;
				}
        console.log("New Total : ", newTotal);
        setTotal(newTotal);
        return;
      }

      if (name === "quantity") {
        setQuantity(+value);
				let newTotal
				if(buyingPrice) {
        	newTotal = +value * buyingPrice;
				} else {
        	newTotal = +value * 0;
				}
        console.log("New Total : ", newTotal);
        setTotal(newTotal);
        return;
      }

      if (name === "total") {
        setTotal(+value);
        return;
      }
    } catch (e) {
      console.log("Error Occured while handling change : ", e);
    }
  };

	// @ts-ignore
  const handleSubmit = async (e) => {
    try {
			e.preventDefault()
			
      let res = await axios({
				method: "POST",
				url: "/.netlify/functions/postData",
				data: {
					scripName,
					buyingPrice,
					quantity,
					total
				}
			})

			console.log(res.data)
    } catch (e) {
      console.log(
        "Error Occured while submiting the form handleSubmit fn :",
        e
      );
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h1>Invested Value Calculator</h1>
        <div>
          <Label>SCRIP NAME</Label>
          <Input
            type="text"
            name="scripname"
            value={scripName}
            onChange={handleChange}
            placeholder="RELIANCE"
            required
          />
        </div>
        <div>
          <Label>BUYING PRICE</Label>
          <Input
            type="number"
            name="buyingprice"
            value={buyingPrice}
            onChange={handleChange}
            placeholder="2413"
            required
          />
        </div>
        <div>
          <Label>QUANTITY</Label>
          <Input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            placeholder="RELIANCE"
            required
          />
        </div>
        <div>
          <Label>TOTAL</Label>
          <Input
            type="number"
            name="total"
            value={total}
            onChange={handleChange}
            placeholder="2413"
            readOnly
          />
        </div>
        <div>
          <PrimaryButton type="submit" as={SubmitButton}>Submit</PrimaryButton>
          <PrimaryButton type="reset" as={CancelButton}>Cancel</PrimaryButton>
        </div>
        <div>
          <PrimaryButton type="button" onClick={() => setShowModal(!showModal)}>Page 2</PrimaryButton>
        </div>
      </Form>
      {showModal ? (
        <Modal setShowModal={setShowModal}>
          <Popup>
            <h2>Portfolio</h2>
            <Grid>
              <div>
                <div>Logo</div>
                <div>Scrip Name</div>
                <div>Amount Invested</div>
                <div>Amount Time</div>
              </div>
              {result.length === 0
                ? null
								: result.map((item: {
									photoURL: string,
									scripName: string,
									amountInvested: string,
									amountTime: string
							}) => (
                    <div>
                      <div>
                        <Image src={item.photoURL} alt="" />
                      </div>
                      <div>{item.scripName}</div>
                      <div>{item.amountInvested}</div>
                      <div>{item.amountTime}</div>
                    </div>
                  ))}
            </Grid>
          </Popup>
        </Modal>
      ) : null}
    </div>
  );
};

export default App;
