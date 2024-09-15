import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthFormError, Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { saveProductAsync } from '../../../../actions';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const ProductFormContainer = ({
	className,
	product: { id, title, price, category, description, image },
}) => {
	const [titleValue, setTitleValue] = useState(title);
	const [priceValue, setPriceValue] = useState(price);
	const [categoryValue, setCategoryValue] = useState(category);
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [imageValue, setImageValue] = useState(image);
	const [errorMessage, setErrorMessage] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		if (errorMessage) {
			return;
		} else {
			dispatch(
				saveProductAsync(id, {
					title: titleValue,
					price: priceValue,
					category: categoryValue,
					description: descriptionValue,
					image: imageValue,
				}),
			).then(({ id }) => navigate(`/product/${id}`));
		}
	};

	const checkError = (valueField, nameField) => {
		if (!valueField) {
			setErrorMessage(`Введите значение в поле ввода ${nameField}`);
		} else {
			setErrorMessage(null);
		}
	};

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value);
		checkError(target.value, 'Услуга или товар');
	};
	const onPriceChange = ({ target }) => {
		setPriceValue(target.value);
		checkError(target.value, 'Цена');
	};
	const onCategoryChange = ({ target }) => setCategoryValue(target.value);
	const onDescriptionChange = ({ target }) => {
		setDescriptionValue(target.value);
		checkError(target.value, 'Описание услуги или товара');
	};
	const onImageChange = async ({ target }) => {
		let responseData;
		let formData = new FormData();
		formData.append('product', target.files[0]);
		await fetch('/products/upload', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
			body: formData,
		})
			.then((resp) => resp.json())
			.then((data) => {
				responseData = data;
			});

		if (responseData.success) {
			setImageValue(responseData.imageUrl);
		}
	};

	return (
		<div className={className}>
			<div className="editproduct-itemfield">
				<p>Услуга или товар</p>
				<Input
					type="text"
					name="title"
					value={titleValue}
					placeholder="Введите название услуги или товара..."
					onChange={onTitleChange}
				/>
			</div>
			<div className="editproduct-itemfield editproduct-price">
				<p>Цена</p>
				<Input
					type="number"
					name="price"
					placeholder="Введите стоимость..."
					value={priceValue}
					onChange={onPriceChange}
				/>
			</div>
			<div className="editproduct-itemfield">
				<p>Выбрать категорию</p>
				<select
					name="category"
					className="editproduct-selector"
					value={categoryValue}
					onChange={onCategoryChange}
				>
					<option value="training">Тренировки</option>
					<option value="things">Вещи</option>
				</select>
			</div>
			<div className="editproduct-itemfield">
				<p>Описание услуги или товара</p>
				<textarea
					name="description"
					className="editproduct-textarea"
					placeholder="Введите описание услуги или товара..."
					value={descriptionValue}
					onChange={onDescriptionChange}
				></textarea>
			</div>
			<div className="editproduct-itemfield">
				<p>Изображение услуги или товара</p>
				<label htmlFor="file-input">
					{image ? (
						<img
							src={imageValue ? imageValue : URL.createObjectURL(image)}
							className="editproduct-img-upload"
							alt="загруженное изображение"
						/>
					) : (
						<Icon
							id="fa-cloud-upload fa-4x"
							className="editproduct-img-upload"
						/>
					)}
					<Input
						type="file"
						name="image"
						id="file-input"
						onChange={onImageChange}
						hidden
					/>
				</label>
			</div>

			<SpecialPanel
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
						disabled={!!errorMessage}
					/>
				}
			/>
			{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
		</div>
	);
};

export const ProductForm = styled(ProductFormContainer)`
	& .editproduct-itemfield {
		width: 100%;
		font-size: 16px;
	}

	& .editproduct-itemfield input {
		border: 1px solid #c3c3c3;
		font-size: 14px;
	}

	& .editproduct-price {
		width: 25%;
	}

	& .editproduct-selector {
		padding: 10px;
		width: 25%;
		height: 40px;
		font-size: 14px;
		border: 1px solid #c3c3c3;
		border-radius: 10px;
		color: #7b7b7b;
	}

	& .editproduct-textarea {
		width: 100%;
		height: 100px;
		border: 1px solid #c3c3c3;
		font-size: 14px;
		border-radius: 10px;
		padding: 10px;
	}
	& .editproduct-img-upload {
		height: 120px;
		width: 100px;
		border-radius: 10px;
		object-fit: content;
	}
`;

ProductForm.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
