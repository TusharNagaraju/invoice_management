import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteInvoice, copyInvoice, updateStatus } from "../features/invoiceSlice";
import '../App.css';

const InvoiceList = ({ invoices }) => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedInvoices = invoices.slice(startIndex, endIndex);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => setCurrentPage(page);
  const handleRowClick = (index) => setSelectedRow(index);

  const handleCopyInvoice = (invoice) => {
    const invoiceNumber = `INV-${uuidv4().substr(0, 8)}`;
    const newInvoice = {
      ...invoice,
      id: invoiceNumber,
      info: { ...invoice.info, invoiceNumber: invoiceNumber }
    };
    dispatch(copyInvoice({ id: invoice?.id, invoice: newInvoice }));
  };

  const handleStatusChange = (invoice, status) => {
    dispatch(updateStatus({ id: invoice.id, status }));
  };

  const columnStyle = { width: '20%', textAlign: 'center' };

  return (
    <>
      {invoices.length <= 0 ? (
        <h4>Currently, there are no invoices to display. To create a new invoice, click
          <Link to="/create"> Here.</Link>
        </h4>
      ) : (
        <div>
          {/* Header */}
          <div className="d-flex rounded p-3 mb-3 fw-bold text-dark text-center"style={{ backgroundColor: '#19f7c3' }} >
            <div style={columnStyle}>Status</div>
            <div style={columnStyle}>Invoice Number</div>
            <div style={columnStyle}>Customer Name</div>
            <div style={columnStyle}>Amount</div>
            <div style={columnStyle}>Operations</div>
          </div>

          {/* Invoices */}
          {paginatedInvoices.map((invoice, index) => (
            <div
              key={invoice?.info?.invoiceNumber}
              onClick={() => handleRowClick(index)}
              className={`d-flex align-items-center justify-content-between bg-white rounded shadow-sm p-3 mb-3 ${selectedRow === index ? 'bg-light' : ''}`}
            >
              {/* Status */}
              <div style={columnStyle}>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    className="rounded-pill px-3"
                    style={{
                      backgroundColor: invoice?.info?.status === 'Paid' ? '#ffe066' : '#ff922b',
                      color: '#000',
                      border: 'none',
                      minWidth: '90px'
                    }}
                  >
                    {invoice?.info?.status || 'Not Paid'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(invoice, 'Paid')}>Paid</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(invoice, 'Not Paid')}>Not Paid</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Invoice Number */}
              <div style={columnStyle}>{invoice?.info?.invoiceNumber}</div>

              {/* Customer Name */}
              <div style={columnStyle}>{invoice?.info?.billTo}</div>

              {/* Amount */}
              <div style={columnStyle}>{invoice?.total}</div>

              {/* Operations */}
              <div style={columnStyle}>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary"
                    size="sm"
                    className="rounded-pill px-3"
                  >
                    Select
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/invoice/${invoice?.info?.invoiceNumber}`}>View</Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/invoice/edit/${invoice?.info?.invoiceNumber}`}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCopyInvoice(invoice)}>Copy</Dropdown.Item>
                    <Dropdown.Item onClick={() => dispatch(deleteInvoice({ id: invoice?.id }))}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="pagination mt-4 text-center">
            <Button className="me-2" variant='outline-secondary' onClick={() => handlePageChange(1)} disabled={isFirstPage}>First</Button>
            <Button className="me-2" variant='outline-dark' onClick={() => handlePageChange(currentPage - 1)} disabled={isFirstPage}>Back</Button>
            <Button className="me-2" variant='outline-dark' onClick={() => handlePageChange(currentPage + 1)} disabled={isLastPage}>Next</Button>
            <Button variant='outline-secondary' onClick={() => handlePageChange(totalPages)} disabled={isLastPage}>Last</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceList;





