import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Icon, Input, Button, H2, AuthFormError } from '../../components';
import { saveProductAsync } from '../../actions';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { request } from '../../utils';
import styled from 'styled-components';

const addFormSchema = yup.object().shape({
	title: yup.string().required('Заполните поле названия услуги или товара'),
	price: yup
		.string()
		.required('Заполните поле с ценой')
		.matches(/^\d+$/, 'Неверно заполнено поле с ценой. Допускаются только цифры'),
	description: yup.string().required('Заполните поле с описанием услуги или товара'),
	image: yup.string().required('Необходимо выбрать изображение услуги или товара'),
});

const AddProductContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			price: '',
			category: 'training',
			description: '',
			image: '',
		},
		resolver: yupResolver(addFormSchema),
	});

	const [imageFile, setImageFile] = useState(false);

	const errorMessage =
		errors?.title?.message ||
		errors?.price?.message ||
		errors?.description?.message ||
		errors?.image?.message;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addProductItem = async ({ title, price, category, description, image }) => {
		let responseData;
		let product = { title, price, category, description, image };
		let formData = new FormData();
		formData.append('product', imageFile);

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
			product.image = responseData.imageUrl;
			request('/products/addproduct', 'POST', product).then((data) => {
				data
					? alert('Ура! Добавление прошло успешно')
					: alert('Ошибка добавления');
				dispatch(saveProductAsync(data.data.id, product)).then(() =>
					navigate(`/listproducts`),
				);
			});
		}
	};

	return (
		<div className={className}>
			<H2>Добавить новую услугу или товар</H2>
			<form onSubmit={handleSubmit(addProductItem)}>
				<div className="addproduct-itemfield">
					<p>Услуга или товар</p>
					<Input
						type="text"
						placeholder="Введите название услуги или товара..."
						{...register('title')}
					/>
				</div>
				<div className="addproduct-itemfield addproduct-price">
					<p>Цена</p>
					<Input
						type="text"
						placeholder="Введите стоимость..."
						{...register('price')}
					/>
				</div>
				<div className="addproduct-itemfield">
					<p>Выбрать категорию</p>
					<select className="addproduct-selector" {...register('category')}>
						<option value="training">Тренировки</option>
						<option value="things">Вещи</option>
					</select>
				</div>
				<div className="addproduct-itemfield">
					<p>Описание услуги или товара</p>
					<textarea
						className="addproduct-textarea"
						placeholder="Введите описание услуги или товара..."
						{...register('description')}
					></textarea>
				</div>
				<div className="addproduct-itemfield">
					<p>Загрузить изображение</p>
					<label htmlFor="file-input">
						{imageFile ? (
							<img
								src={URL.createObjectURL(imageFile)}
								className="addproduct-img-upload"
								alt="загруженное изображение"
							/>
						) : (
							<Icon
								id="fa-cloud-upload fa-4x"
								className="addproduct-img-upload"
							/>
						)}
						<Input
							type="file"
							id="file-input"
							{...register('image', {
								onChange: (e) => {
									setImageFile(e.target.files[0]);
								},
							})}
							hidden
						/>
					</label>
				</div>
				<Button type="submit" disabled={!!errorMessage}>
					Добавить
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const AddProduct = styled(AddProductContainer)`
	margin: 20px 70px 70px;
	& H2 {
		display: flex;
		justify-content: center;
	};

	& .addproduct-itemfield {
		width: 100%;
		font-size: 16px;
	}

	& .addproduct-itemfield input {
		border: 1px solid #c3c3c3;
		font-size: 14px;
	}

	& .addproduct-price {
		width: 25%;
	}

	& .addproduct-selector {
		padding: 10px;
		width: 25%;
		height: 40px;
		font-size: 14px;
		border: 1px solid #c3c3c3;
		border-radius: 10px;
		color: #7b7b7b;
	}

	& .addproduct-textarea {
		width: 100%;
		height: 100px;
		border: 1px solid #c3c3c3;
		font-size: 14px;
		border-radius: 10px;
		padding: 10px;
	}

	& .addproduct-img-upload {
		height: 120px;
		width: 100px;
		border-radius: 10px;
		object-fit: content;
	}

	& Button {
		margin-top: 20px;
		width: 25%;
		height: 48px;
		outline: none;
		border: none;
		font-size: 16px;
		font-weight: 600;
		color: white;
		background: #2e5f3c;
	}

	& Button:hover {
		background: #144123;
	}

	& Button:disabled {
		background: #808080;
	}
}
`;
