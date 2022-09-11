import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import {
  Button,
  ModalBody,
  ModalHeader,
  Input,
  Modal,
  ModalFooter,
  Form,
  FormFeedback,
  Row,
  Col,
  Select,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//translation
import { useTranslation } from 'react-i18next';
//icons
import { FaCheckCircle } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CgAsterisk } from 'react-icons/cg';
//context
import { ClientContext } from '@/context/ClientContext';
//api
import { searchProducts, getProducts } from 'api/products';
import { getFilteredCollectionsListBack } from 'api/collections';
//own components
import ThemeWrapper from './ThemeWrapper';
import SelectCustom from '@/components/inputs/SelectCustom';
import { useRef } from 'react';
import { displayCategories } from 'helpers';

export const SliderModal = ({ open, setModal, element, saveSlider }) => {
  const { t } = useTranslation('backoffice');
  const { client } = useContext(ClientContext);

  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { register, handleSubmit, errors, control, getValues, setValue, formState, watch } = useForm({
    defaultValues: {
      typeSlider: element?.type_slider || null,
      category: element?.category || null,
      active: element?.active,
      selectedProduct: element?.results || null,
      products: [],
    },
  });

  const watchTypeSlider = watch('typeSlider');
  const watchSelectedProduct = watch('selectedProduct');
  const watchProducts = watch('products');

  const [categories, setCategories] = useState([]);
  const [typeSliders, setTypeSliders] = useState([]);

  const displayTypeSlider = () => {
    if (client) {
      setTypeSliders([
        { id: 1, name: `${t('modalList.typeListProduct')}` },
        { id: 5, name: `${t('modalList.typeListSerie')}` },
      ]);
    }
  };

  const toastOnError = (message) =>
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const toggle = () => closeModal();

  const filterBy = () => true;

  const closeModal = () => setModal(!open);

  const imageClick = (id, position) => {
    if (id === selectedCover) {
      setSelectedCover(null);
    } else {
      setSelectedCover(id);
    }
  };
  const imgFileChange = (event) => {
    console.log('Soy imgFileChange',event.target.files[0])
    if (event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const deleteImage = (event) => {
    // if (covers) {
    //   covers.value = null;
    // }
    setSelectedImage(null);
  };

  const onSubmit = (data) => {
    const { active, category, selectedProduct, typeSlider } = data;
    let form = new FormData();
    let coverFile;
    // if (covers) {
    //   coverFile = covers.files[0]
    // }
    if (selectedProduct) {
      let product = selectedProduct;
      form.set('product_id', product.id);
      form.set('active', active);
      // form.set('order', order);
      if (category) {
        form.set('category', category);
      } else toastOnError('El campo categoría está vacio, por favor seleccione una.');

      if (typeSlider) {
        form.set('type_slider', typeSlider);
      } else toastOnError('El campo tipo de slider está vacio, por favor seleccione uno.');

      coverFile = selectedImage;

      if (coverFile) {
        form.set('cover_file', coverFile);
      }
      if (selectedCover) {
        form.set('cover_select', selectedCover);
      }
      if (coverFile && selectedCover) {
        toastOnError('Debe selecionar solo un cover, o subir una imagen');
      }
      // Si no hay seleccionadas un cover ni una imagen
      if (!coverFile && !selectedCover) {
        toastOnError('Debe selecionar un cover, o subir una imagen');
      } else if (!product.has_cover_slider && coverFile === undefined && !selectedCover) {
        toastOnError('El producto no tiene un cover asociado, debe subir una imagen o seleccionar un cover');
      } else {
        saveSlider(element?.id, form);
      }
    } else {
      toastOnError('El campo producto está vacio, por favor seleccione uno.');
    }
    closeModal();
  };

  const handleSearch = useCallback(async (query) => {
    const { typeSlider } = getValues();
    const querySearch = { name: query };
    const saveResult = (result) => setValue('products', result);

    if (typeSlider === 1) {
      const { status, data } = await getProducts(1, querySearch);
      if (status === 200) saveResult(data.results);
    } else if (typeSlider === 5) {
      const { status, data } = await getFilteredCollectionsListBack(1, querySearch);
      if (status === 200) saveResult(data.results);
    } else {
      const { status, data } = await getProducts(1, querySearch);
      if (status === 200) saveResult(data.results);
    }

    setSelectedCover(null);
    setSelectedImage(null);
  });

  useEffect(() => {
    register('products');
    setSelectedCover(null);
    setSelectedImage(null);
    displayCategories({
      client: client,
      translater: t,
      dispatcher: setCategories,
      showHomeMovies: true,
    });
    displayTypeSlider();

    if (element) {
      if (element.type_slider === 5) {
        setValue('typeSlider', 5);
      } else {
        setValue('typeSlider', 1);
      }
      setSelectedCover(element.cover_slider.id);
    }
  }, [open]);

  const checkTypeSlider = (selSlider, onChange) => {
    const { typeSlider } = getValues();
    if (selSlider === '1') {
      // Por Producto
      if (typeSlider !== 1) {
        setValue('selectedProduct', null);
      }
      onChange(1);
    } else if (selSlider === '5') {
      // Por Colección
      if (typeSlider !== 5) {
        setValue('selectedProduct', null);
      }
      onChange(5);
    } else {
      onChange(null);
    }
  };

  return (
    <Modal className="sliders-management__modal-create-silder" isOpen={open} toggle={toggle}>
      <ThemeWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>
            {!element ? t('modalSlider.newSlider') : t('modalSlider.editSlider')}
          </ModalHeader>
          <ModalBody>
            <small className="txt-choose">
              {t('modalList.mandatoryFields1')}
              <CgAsterisk color="red" size="16" />
              {t('modalList.mandatoryFields2')}
              {t('modalList.euMandatoryFields')}
            </small>
            <br />
            <br />
            <span className="txt-choose">{t('modalSlider.chooseCategory')}</span>
            <CgAsterisk style={{ color: 'red', size: '16' }} />
            <Row form>
              <Col md={12}>
                <Controller
                  name="category"
                  control={control}
                  defaultValue={element?.category}
                  rules={{ required: true }}
                  render={({ onChange }) => (
                    <Input
                      type="select"
                      defaultValue={element?.category}
                      placeholder={t('modalSlider.chooseCategory')}
                      displayempty="true"
                      variant="standard"
                      invalid={Boolean(errors.category)}
                      onChange={onChange}
                    >
                      <option value="0" disabled selected>
                        {t('modalSlider.chooseCategory')}
                      </option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                {errors.category && <p className="text-danger"> {t('modalList.categoryRequired')}</p>}
              </Col>
            </Row>
            <br />
            <small className="slct-category">{t('modalList.chooseTypeSlider')}</small>
            <CgAsterisk style={{ color: 'red', size: '16' }} />
            <Row form>
              <Col md={12}>
                <Controller
                  name="typeSlider"
                  defaultValue={null}
                  rules={{ required: true }}
                  control={control}
                  className="slct-list-category"
                  render={({ onChange, value }) => {
                    return (
                      <SelectCustom
                        isDisabled={Boolean(element)}
                        onChange={(event) => checkTypeSlider(event.target.value, onChange)}
                        placeholder={t('modalSlider.chooseTypeSlider')}
                        selected={value}
                        options={typeSliders}
                      />
                    );
                  }}
                />
                {errors.typeList && <small className="text-danger">t('modalList.typeRequired')</small>}
              </Col>
            </Row>
            <br />
            <span className="txt-choose">{t('modalSlider.chooseProducts')}</span>
            <CgAsterisk style={{ color: 'red', size: '16' }} />
            <Row form>
              <Col md={12}>
                <Controller
                  name="selectedProduct"
                  rules={{ required: true }}
                  defaultValue={watchSelectedProduct}
                  control={control}
                  render={({ value, onChange }) => {
                    return (
                      <AsyncTypeahead
                        filterBy={filterBy}
                        id="id_search_products"
                        // isLoading={isLoading}
                        labelKey={(option) => `${option.name}`}
                        minLength={3}
                        onSearch={handleSearch}
                        disabled={Boolean(element) || !watchTypeSlider}
                        onChange={(newValue) => onChange(newValue[0])}
                        selected={value ? [value] : []}
                        options={watchProducts}
                        placeholder={t('modalSlider.search')}
                      />
                    );
                  }}
                />
                {/* <small className="text-danger">{errors.selectedProduct && t('modalList.productRequired')}</small> */}
              </Col>
            </Row>
            <br />
            <small>{t('modalSlider.chooseCover')}</small>
            <CgAsterisk style={{ color: 'red', size: '16' }} />
            {Boolean(watchSelectedProduct) ? (
              <Row className={'row_gallery' + (Boolean(selectedImage) ? ' disable_div' : '')} form>
                <Col md={12}>
                  <Row form>
                    {watchSelectedProduct &&
                      watchSelectedProduct.covers.map((item, index) => (
                        <Col key={item.id} md={4} className="gallery-col">
                          <div className="gallery-contenedor">
                            {/* {console.log('ZER DAKAR?', selectedCover)} */}
                            <div
                              onClick={() => imageClick(item.id, index)}
                              className={'gallery-item' + (item.id === selectedCover ? ' selected' : '')}
                            >
                              <img className="gallery-image" src={item.cover} alt="avatar" />
                              <i className={item.id === selectedCover ? ' icon_check' : ''}>
                                {' '}
                                <FaCheckCircle />{' '}
                              </i>
                            </div>
                          </div>
                        </Col>
                      ))}
                  </Row>
                </Col>
              </Row>
            ) : null}
            <br />
            <small>{t('modalSlider.imageUpload')}</small>
            <Row form>
              <Col md={12}>
                <input
                  disabled={selectedCover}
                  name="cover_file"
                  type="file"
                  onChange={(event) => imgFileChange(event)}
                />
                {Boolean(selectedImage) ? (
                  <div className="cont_img_file">
                    <img className="img_file" src={URL.createObjectURL(selectedImage)} />
                    <RiDeleteBin5Fill onClick={deleteImage} className="icon_delete" />
                  </div>
                ) : null}
              </Col>
            </Row>
            <br />
            <Row form>
              <Col md={12}>
                <span>{t('visible')}</span>
                <br />
                <Controller
                  name="active"
                  control={control}
                  // rules={{required:true}}
                  defaultValue={true}
                  render={({ onChange, value, onBlur, ref }) => (
                    <Input
                      defaultChecked={true}
                      onBlur={onBlur}
                      type="checkbox"
                      checked={value}
                      innerRef={ref}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="buttons-sliders">
            <Button
              type="submit"
              disabled={Boolean(!watchTypeSlider || !watchSelectedProduct)}
              className="BackofficeModalAcceptBtn"
            >
              {t('save')}
            </Button>
            <Button onClick={closeModal} outline color="secondary">
              {t('cancel')}
            </Button>
          </ModalFooter>
        </Form>
      </ThemeWrapper>
      <ToastContainer />
    </Modal>
  );
};

SliderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
