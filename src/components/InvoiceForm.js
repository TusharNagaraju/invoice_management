import React from 'react';
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '₹',
      currentDate: '',
      invoiceNumber: '',
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      notes: '',
      total: '0.00',
      subTotal: '0.00',
      taxRate: '',
      taxAmmount: '0.00',
      discountRate: '',
      discountAmmount: '0.00',
      items: [
        {
          id: `INV-${uuidv4().substr(0, 8)}`,
          name: '',
          description: '',
          price: '1.00',
          quantity: 1
        }
      ]
    };
    this.editField = this.editField.bind(this);
  }

  componentDidMount(prevProps) {
    if (prevProps?.invoice?.info?.invoiceNumber !== this.props?.invoice?.info?.invoiceNumber) {
      this.setState({
        ...this.props?.invoice?.info,
        isOpen: false,
      });
    }
    this.handleCalculateTotal();
  }

  componentDidUpdate(prevProps) {
    if (prevProps?.invoice?.info?.invoiceNumber !== this.props?.invoice?.info?.invoiceNumber) {
      this.setState({
        ...this.props?.invoice?.info,
        isOpen: false,
      });
    }
  }

  handleRowDel(items) {
    const index = this.state.items.indexOf(items);
    if (index !== -1) {
      const updatedItems = [...this.state.items];
      updatedItems.splice(index, 1);
      this.setState({ items: updatedItems });
    }
  }

  handleAddEvent(evt) {
    evt.preventDefault();
    const id = `INV-${uuidv4().substr(0, 8)}`;
    const newItem = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1
    };
    this.setState({
      items: [...this.state.items, newItem]
    });
  }

  handleCalculateTotal() {
    const items = this.state.items;
    let subTotal = 0;
    for (const item of items) {
      const price = parseFloat(item.price).toFixed(2);
      const quantity = parseFloat(item.quantity);
      if (!isNaN(price) && !isNaN(quantity)) {
        subTotal += price * quantity;
      }
    }

    this.setState({
      subTotal: subTotal.toFixed(2)
    }, () => {
      this.setState({
        taxAmmount: parseFloat(subTotal * (this.state.taxRate / 100)).toFixed(2)
      }, () => {
        this.setState({
          discountAmmount: parseFloat(subTotal * (this.state.discountRate / 100)).toFixed(2)
        }, () => {
          this.setState({
            total: ((subTotal - this.state.discountAmmount) + parseFloat(this.state.taxAmmount)).toFixed(2)
          });
        });
      });
    });
  }

  onItemizedItemEdit(evt) {
    evt.preventDefault();
    const itemName = evt.target.name;
    const itemId = evt.target.id;
    const itemValue = evt.target.value;

    const items = this.state.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, [itemName]: itemValue };
      }
      return item;
    });

    this.setState({ items: items });
    this.handleCalculateTotal();
  }

  editField = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value }, this.handleCalculateTotal);
  };

  openModal = (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    this.setState({ isOpen: true });
  };

  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <>
        {window.location.pathname.includes('edit') ? <h1>Edit Invoice</h1> : <h1>Create Invoice</h1>}

        <Form onSubmit={this.openModal}>
          <InvoiceModal
            showModal={this.state.isOpen}
            closeModal={this.closeModal}
            info={this.state}
            items={this.state.items}
            currency={this.state.currency}
            subTotal={this.state.subTotal}
            taxAmmount={this.state.taxAmmount}
            discountAmmount={this.state.discountAmmount}
            total={this.state.total}
          />

          <Row>
            <Col xs={12}>
              <Card className="p-4 p-xl-5 my-3 my-xl-4 w-100">
                <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                      <span className="current-date">{new Date().toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                      <Form.Control type="date" value={this.state.dateOfIssue} name="dateOfIssue" onChange={this.editField} style={{ maxWidth: '150px' }} required />
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <Form.Label className="fw-bold">Invoice Number:</Form.Label>
                    <Form.Control
                      type="text"
                      name="invoiceNumber"
                      value={this.state.invoiceNumber}
                      onChange={this.editField}
                      placeholder="Enter Invoice Number"
                      style={{ maxWidth: '200px' }}
                      required
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <Row className="mb-5">
                  <Col>
                    <Form.Label className="fw-bold">Bill to:</Form.Label>
                    <Form.Control placeholder="Who is this invoice to?" value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={this.editField} autoComplete="name" required />
                    <Form.Control placeholder="Email address" value={this.state.billToEmail} type="email" name="billToEmail" className="my-2" onChange={this.editField} autoComplete="email" required />
                    <Form.Control placeholder="Billing address" value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" onChange={this.editField} autoComplete="address" required />
                  </Col>
                  <Col>
                    <Form.Label className="fw-bold">Bill from:</Form.Label>
                    <Form.Control placeholder="Who is this invoice from?" value={this.state.billFrom} type="text" name="billFrom" className="my-2" onChange={this.editField} autoComplete="name" required />
                    <Form.Control placeholder="Email address" value={this.state.billFromEmail} type="email" name="billFromEmail" className="my-2" onChange={this.editField} autoComplete="email" required />
                    <Form.Control placeholder="Billing address" value={this.state.billFromAddress} type="text" name="billFromAddress" className="my-2" onChange={this.editField} autoComplete="address" required />
                  </Col>
                </Row>

                <InvoiceItem
                  onItemizedItemEdit={this.onItemizedItemEdit.bind(this)}
                  onRowAdd={this.handleAddEvent.bind(this)}
                  onRowDel={this.handleRowDel.bind(this)}
                  currency={this.state.currency}
                  items={this.state.items}
                />

                <Row className="mt-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Tax rate:</Form.Label>
                      <InputGroup className="my-1 flex-nowrap">
                        <Form.Control
                          name="taxRate"
                          type="number"
                          value={this.state.taxRate}
                          onChange={this.editField}
                          className="bg-white border"
                          placeholder="0.0"
                          min="0.00"
                          step="0.01"
                          max="100.00"
                        />
                        <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Discount rate:</Form.Label>
                      <InputGroup className="my-1 flex-nowrap">
                        <Form.Control
                          name="discountRate"
                          type="number"
                          value={this.state.discountRate}
                          onChange={this.editField}
                          className="bg-white border"
                          placeholder="0.0"
                          min="0.00"
                          step="0.01"
                          max="100.00"
                        />
                        <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-4 justify-content-end">
                  <Col lg={6}>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Subtotal:</span>
                      <span>{this.state.currency}{this.state.subTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <span className="fw-bold">Discount:</span>
                      <span>
                        <span className="small">({this.state.discountRate || 0}%)</span>
                        {this.state.currency}{this.state.discountAmmount}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <span className="fw-bold">Tax:</span>
                      <span>
                        <span className="small">({this.state.taxRate || 0}%)</span>
                        {this.state.currency}{this.state.taxAmmount}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between" style={{ fontSize: '1.125rem' }}>
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold">{this.state.currency}{this.state.total}</span>
                    </div>
                  </Col>
                </Row>

                <hr className="my-4" />
                <Form.Label className="fw-bold">Notes:</Form.Label>
                <Form.Control
                  placeholder="Thanks for your business!"
                  name="notes"
                  value={this.state.notes}
                  onChange={this.editField}
                  as="textarea"
                  className="my-2"
                  rows={1}
                />

                <Row className="mt-4">
                  <Col md={6}>
                    <Link to="/">
                      <Button variant="secondary" className="w-100">Cancel & Back Home</Button>
                    </Link>
                  </Col>
                  <Col md={6}>
                    <Button variant="primary" type="submit" className="w-100">Review Invoice</Button>
                  </Col>
                </Row>

              </Card>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default InvoiceForm;
